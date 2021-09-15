import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EventObject } from 'src/app/entities/Event';
import { EventFilter } from 'src/app/filters/event.filter';
import { VariablesService } from 'src/app/services/core/variables.service';
import { EventService } from 'src/app/services/event.service';
import { File } from '@ionic-native/file/ngx';
import { UtilService } from 'src/app/services/util.service';
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
    private file: File,
    public utilService: UtilService) { }
  ngOnInit() {
    this.retrieveUserEvents();
    this.events.forEach(event => {
      if (event.status == this.variablesService.STATUS.CREATION) {
        if(this.utilService.nowBetween(event.startDate, event.endDate)){
          event.status = this.variablesService.STATUS.ACTIVE;
          this.eventService.save(event);
        }else if(this.utilService.dateBefore(event.endDate, new Date())){
          event.status = this.variablesService.STATUS.FINISHED;
          this.eventService.save(event);
        }
      }
      
      if (event.status != this.variablesService.STATUS.CREATION) {
        //TODO And days after ending are less than 3(?)
        this.retrieveUserPics();
        this.scanFolders();
        this.uploadImages();
        this.scanImgaes();
        this.retrieveImages();
        this.deleteCloudImages();
      }
    })
  }
  retrieveUserPics() {
    throw new Error('Method not implemented.');
  }
  scanFolders() {

  }
  uploadImages() {
    throw new Error('Method not implemented.');
  }
  scanImgaes() {
    throw new Error('Method not implemented.');
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




  private async retrieveUserEvents() {
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
    }
  }

  goToAddEvent() {
    this.router.navigate(['/newEvent']);
  }
  goToFindEvent() {
    this.router.navigate(['/joinEvent']);
  }

}
