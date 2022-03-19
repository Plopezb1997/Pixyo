import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EventObject } from 'src/app/entities/EventObject';
import { EventFilter } from 'src/app/filters/event.filter';
import { VariablesService } from 'src/app/services/core/variables.service';
import { EventService } from 'src/app/services/event.service';
import { File as FileNative, Entry } from '@ionic-native/file/ngx';
import { UtilService } from 'src/app/services/util.service';
import { PicService } from 'src/app/services/pic-service.service';
import { Pic } from 'src/app/entities/Pic';
import { User } from 'src/app/entities/User';
import { Assistant } from 'src/app/entities/Assistant';
import { AssistantService } from 'src/app/services/assistant.service';
import * as faceapi from 'face-api.js';
import { FilesService } from 'src/app/services/files.service';
import { FaceApiService } from 'src/app/services/faceApi.service';
@Component({
  selector: 'app-home-event',
  templateUrl: './home-event.component.html',
  styleUrls: ['./home-event.component.scss'],
})
export class HomeEventComponent implements OnInit {


  events: EventObject[];
  constructor(private router: Router,
    private nativeStorage: NativeStorage,
    private eventService: EventService,
    private variablesService: VariablesService,
    private file: FileNative,
    public utilService: UtilService,
    public picService: PicService,
    public fileService: FilesService,
    public assistantService: AssistantService,
    public luxand: FaceApiService) { }
  ngOnInit() {
    this.eventService.retrieveUserEvents.subscribe(()=>{
    this.retrieveUserEvents().then(() => {
      this.processEvents();
    });
  });
  this.eventService.retrieveUserEvents.next();
  }







  private async retrieveUserEvents()
  //:Promise<EventObject[]> 
  {


    //entries
    //let fileEntry = await 
    /*this.file.resolveLocalFilesystemUrl('file:///DCIM').then(value=>{
      console.log(JSON.stringify(value));
    }).catch(err=>{
      console.log(JSON.stringify(err));
    })*/
    //fileEntry.getMetadata( );
    let user = await this.nativeStorage.getItem('user')
    if (user) {
      let filter: EventFilter = new EventFilter();
      let userObj = JSON.parse(user);
      userObj.face = undefined;
      filter.creator = userObj;
      filter.assistantsInEvents = [userObj];
      //Creación, Activo
      filter.statusIn = ['C', 'A'];
      this.events = await this.eventService.findJoinedEvents(filter).toPromise();
      // return this.events;
    }
  }





  async processEvents() {
    for (let i = 0; i < this.events.length; i++) {
      let event = this.events[i];

      //if (event.status == this.variablesService.STATUS.CREATION) {
        this.setEventStatus(event, i);
     // }

      if (event.status != this.variablesService.STATUS.CREATION&&event.status == this.variablesService.STATUS.ACTIVE) {
        //TODO And days after ending are less than 3(?)
        if (this.utilService.dateBefore(new Date(), new Date(event.endDate))) {


          /*this.retrieveUserPics().then(files => {
            
          }
          );*/
          let picsInPhone: Entry[] = [];
          let picsNotUploaded: Pic[] = [];
          let dates: Date[] = [];
          let initialPicsScan = 'file';
          await this.scanFolders(picsInPhone, event, dates);
          //this.fileService.
          await this.comparefiles(picsInPhone, event, picsNotUploaded, dates);
          await this.uploadImages(event, picsNotUploaded);
          //TODO faceapi scan and detect faces
          this.scanImages(picsNotUploaded);
          this.retrieveImages();
          this.deleteCloudImages();
        } else {
          event.status = this.variablesService.STATUS.FINISHED;
          this.eventService.save(event);
        }
      }
    }
  }
  private async setEventStatus(event: EventObject, i: number) {
    if (this.utilService.nowBetween(new Date(event.startDate), new Date(event.endDate))) {
      event.status = this.variablesService.STATUS.ACTIVE;
      await this.eventService.save(event).toPromise();
    } else if (this.utilService.dateBefore(new Date(event.endDate), new Date())) {
      event.status = this.variablesService.STATUS.FINISHED;
      await this.eventService.save(event).toPromise();
      this.events.splice(i, 1);
      i--;
      //TODO EVOLUTIvO
      /*Si el usuario tiene fotos subidas en las que no aparece nadie,
      preguntarle a qué asistentes enviárselas*/
      /*TODO EVOLUTIVO
      Mostrar a quién se ha enviado la foto y preguntar si falta alguien*/
    }
    return i;
  }

  /**
   * Escanea la cámara entre las fechas determinadas
   * @param pics 
   * @param event 
   * @returns 
   */
  async scanFolders(pics: Entry[], event: EventObject, dates: Date[]): Promise<Entry[]> {
    let path = 'DCIM/';
    await this.scanFoldersAndroid(path, pics, event, dates);
    console.log(JSON.stringify(pics));
    //throw new Error('Method not implemented.');
    let fechaFin: Date = new Date();
    let assistant: Assistant = await this.retrieveUserAssistant(event);
    assistant.lastScan = fechaFin;
    assistant.userid = assistant.assistantId.userid;
    assistant.eventid = assistant.assistantId.eventid;
    await this.assistantService.save(assistant).toPromise().then().catch(error=>console.log(error));
    return pics;
  }

  private async scanFoldersAndroid(path: string, pics: Entry[], event: EventObject, dates: Date[]) {
    let entries: Entry[] = await this.file.listDir('file:///storage/emulated/0/', path);
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      if (entry.isDirectory
        && !entry.name.toLowerCase().includes('thumb')) {
        await this.scanFoldersAndroid(entry.fullPath.substr(1), pics, event, dates);
      } else if (entry.name.toLowerCase().endsWith('jpg')
        && !entry.name.toLowerCase().includes('thumb')) {
        //iOS macobserver.com/tips/how-to/how-to-convert-iphone-photos-jpg-format/
        
        let assistant: Assistant = await this.retrieveUserAssistant(event);
        if (assistant) {
          let fechaInicio: Date = new Date(assistant.lastScan?assistant.lastScan:event.startDate);
          let fechaFin: Date = new Date();
          let flagArray = []
          this.findPicsInStorage(entry, fechaInicio, fechaFin, pics, flagArray, dates);
          setTimeout(()=>{
            while(flagArray.length==1&&flagArray[flagArray.length-1]==false){
              console.log('no terminó')
            }
            console.log('TERMINÓ')
          }, 500);
        }
      }
    }
    console.log(JSON.stringify(pics));
  }

  private async retrieveUserAssistant(event: EventObject) {
    let assistant: Assistant;
    let user: User = await this.utilService.getUser();
    event.assistants.forEach(assist => {
      if (assist.assistantId.userid == user.userid) {
        assistant = assist;
      }
    });
    return assistant;
  }

  private findPicsInStorage(entry: Entry, fechaInicio: Date, fechaFin: Date, pics: Entry[], flagArray:boolean[], dates: Date[]) {
    flagArray.push(false);
    entry.getMetadata(metadata => {
      if (this.utilService.dateBefore(fechaInicio, metadata.modificationTime)
        && this.utilService.dateBefore(metadata.modificationTime, fechaFin)) {
        pics.push(entry);
        dates.push(metadata.modificationTime);
      }
      flagArray.push(true);
    }, error=>{
      flagArray.push(true);
      console.log(error);
    });
  }

  /**
   * Compara el raw las fotos subidas con las actuales
   * @param picsInPhone 
   * @param event 
   */
  async comparefiles(picsInPhone: Entry[], event: EventObject, picsNotUploaded: Pic[], dates: Date[]) {
    let picsSaved = await this.picService.findByEventId(event.eventId).toPromise();

    for (let i = 0; i < picsInPhone.length; i++) {
      //window.resolveLocalFileSystemURL(picsInPhone[i].fullPath, this.gotFile, this.fail);
      //PRUEBAS FALLADAS
      //'Android','file:///storage/emulated/0'+picsInPhone[i].fullPath
      //'Android','file:///storage/emulated/0/'+picsInPhone[i].fullPath
      //'file:///storage/emulated/0/',picsInPhone[i].fullPath
      //'file:///storage/emulated/0/',picsInPhone[i].fullPath.substr(1)
      let file = await this.fileService.readDataInBase64(picsInPhone[i].fullPath);
      console.log(file);
      //let filearray = this.fileService.base64ToByteArray(file);
      let uploaded: boolean = false;
      for (let j = 0; j < picsSaved.length; j++) {
        if (file == picsSaved[j].pic) {
          uploaded = true;
        }
      }
      if (!uploaded) {
        let pic: Pic = new Pic();
        pic.eventid = event;
        pic.pic = file;
        pic.scanned = false;
        pic.creationDate = dates[i];
        picsNotUploaded.push(pic);
      }
    }
  }

  async retrieveUserPics() {

  }


  async uploadImages(event: EventObject, picsNotUploaded: Pic[]) {
    for (let i = 0; i < picsNotUploaded.length; i++) {
      let pic:Pic = picsNotUploaded[i];
      pic = await this.picService.save(pic).toPromise();
    }
  }
  async scanImages(pics: Pic[]) {
    for(let i =0; i<pics.length;i++){
      let pic = pics[i];
      //let file = this.fileService.base64toBlob(pic.pic,this.variablesService.picFormat );
      let result = await this.luxand.recognizePeople(pic.pic).toPromise();
    }
  
  }
  retrieveImages() {
    /*const path = this.file.documentsDirectory;
    const directory = 'Attendance Log';
    this.file
      .checkDir(path, directory)
      .then(res => {
        this.file
          .writeFile(path + directory, opts.fileName, opts.text, options)
          .then(res => {
            this.fileOpener
              .open(`${path}${directory}/${opts.fileName}`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
              .then(() => ...)
              .catch(error => ...);
          })
          .catch(error => ...);
        throw new Error('Method not implemented.');
      })*/
  }
  deleteCloudImages() {
    throw new Error('Method not implemented.');
  }

  goToAddEvent() {
    this.router.navigate(['/newEvent']);
  }
  goToFindEvent() {
    this.router.navigate(['/joinEvent']);
  }

}
