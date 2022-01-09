import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EventObject } from 'src/app/entities/Event';
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
import { LuxandService } from 'src/app/services/luxand.service';
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
    public luxand: LuxandService) { }
  ngOnInit() {
    this.retrieveUserEvents().then(() => {
      this.processEvents();
    });
    
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

      if (event.status == this.variablesService.STATUS.CREATION) {
        if (this.utilService.nowBetween(new Date(event.startDate), new Date(event.endDate))) {
          event.status = this.variablesService.STATUS.ACTIVE;
          this.eventService.save(event);
        } else if (this.utilService.dateBefore(new Date(event.endDate), new Date())) {
          event.status = this.variablesService.STATUS.FINISHED;
          this.eventService.save(event);
          this.events.splice(i, 1);
          i--;
          //TODO EVOLUTIvO
          /*Si el usuario tiene fotos subidas en las que no aparece nadie,
          preguntarle a qué asistentes enviárselas*/
          /*TODO EVOLUTIVO
          Mostrar a quién se ha enviado la foto y preguntar si falta alguien*/

        }
      }

      if (event.status != this.variablesService.STATUS.CREATION) {
        //TODO And days after ending are less than 3(?)
        if (this.utilService.dateBefore(new Date(), this.utilService.addDays(event.endDate, 1))) {


          /*this.retrieveUserPics().then(files => {
            
          }
          );*/
          let picsInPhone: Entry[] = [];
          let picsNotUploaded: Pic[] = [];
          await this.scanFolders(picsInPhone, event);
          await this.comparefiles(picsInPhone, event, picsNotUploaded);
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
  /**
   * Escanea la cámara entre las fechas determinadas
   * @param pics 
   * @param event 
   * @returns 
   */
  async scanFolders(pics: Entry[], event: EventObject): Promise<Entry[]> {
    let path = 'DCIM/';
    await this.scanFoldersAndroid(path, pics, event);
    console.log(JSON.stringify(pics));
    //throw new Error('Method not implemented.');
    return pics;
  }

  private async scanFoldersAndroid(path: string, pics: Entry[], event: EventObject) {
    let entries: Entry[] = await this.file.listDir('file:///storage/emulated/0/', path);
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      if (entry.isDirectory
        && !entry.name.toLowerCase().includes('thumb')) {
        await this.scanFoldersAndroid(entry.fullPath.substr(1), pics, event);
      } else if (entry.name.toLowerCase().endsWith('jpg')
        && !entry.name.toLowerCase().includes('thumb')) {
        //iOS macobserver.com/tips/how-to/how-to-convert-iphone-photos-jpg-format/
        let assistant: Assistant;
        let user: User = await this.utilService.getUser()
        event.assistants.forEach(assist => {
          if (assist.userId == user.userId) {
            assistant = assist;
          }
        });
        if (assistant) {
          console.log("VICTORIA");
          let fechaInicio: Date = new Date(assistant.lastScan?assistant.lastScan:event.startDate);
          let fechaFin: Date = new Date();
          this.findPicsInStorage(entry, fechaInicio, fechaFin, pics);
          assistant.lastScan = fechaFin;
          await this.assistantService.save(assistant).toPromise();
        }
      }
    }
    console.log(JSON.stringify(pics));
  }

  private findPicsInStorage(entry: Entry, fechaInicio: Date, fechaFin: Date, pics: Entry[]) {
    entry.getMetadata(metadata => {
      if (this.utilService.dateBefore(fechaInicio, metadata.modificationTime)
        && this.utilService.dateBefore(metadata.modificationTime, fechaFin)) {
        pics.push(entry);
      }
    });
  }

  /**
   * Compara el raw las fotos subidas con las actuales
   * @param picsInPhone 
   * @param event 
   */
  async comparefiles(picsInPhone: Entry[], event: EventObject, picsNotUploaded: Pic[]) {
    let picsSaved = await this.picService.findByEventId(event.eventId).toPromise();

    for (let i = 0; i < picsInPhone.length; i++) {
      //window.resolveLocalFileSystemURL(picsInPhone[i].fullPath, this.gotFile, this.fail);
      //PRUEBAS FALLADAS
      //'Android','file:///storage/emulated/0'+picsInPhone[i].fullPath
      //'Android','file:///storage/emulated/0/'+picsInPhone[i].fullPath
      //'file:///storage/emulated/0/',picsInPhone[i].fullPath
      //'file:///storage/emulated/0/',picsInPhone[i].fullPath.substr(1)
      let file = await this.file.readAsDataURL('file:///storage/emulated/0/', picsInPhone[i].fullPath.substr(1));
      console.log(file);
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
        picsNotUploaded.push(pic);
      }
    }
  }

  async retrieveUserPics() {

  }


  async uploadImages(event: EventObject, picsNotUploaded: Pic[]) {
    for (let i = 0; i < picsNotUploaded.length; i++) {
      let pic = picsNotUploaded[i]
      pic = await this.picService.save(pic).toPromise();
    }
  }
  async scanImages(pics: Pic[]) {
    for(let i =0; i<pics.length;i++){
      let pic = pics[i];
      let file = this.fileService.base64toBlob(pic.pic,this.variablesService.picFormat );
      let result = await this.luxand.recognizePeople(file).toPromise();
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
