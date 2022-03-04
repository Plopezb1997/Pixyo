import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Assistant } from 'src/app/entities/Assistant';
import { EventObject } from 'src/app/entities/EventObject';
import { User } from 'src/app/entities/User';
import { EventFilter } from 'src/app/filters/event.filter';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.scss'],
})
export class JoinEventComponent implements OnInit {


  eventCode: string;
  constructor(private eventService: EventService,
    private nativeStorage: NativeStorage,
    private router: Router) { }

  ngOnInit() { }


  async joinEvent() {
    let filter: EventFilter = new EventFilter();
    filter.eventCode = this.eventCode;
    let events = await this.eventService.find(filter).toPromise();
    let user = await this.nativeStorage.getItem('user');
    if (user) {
      if (!!events && !!events[0]) {
        let event: EventObject = events[0];
        let userObj: User = JSON.parse(user);
        let inEvent: boolean = false;
        let i = 0;
        if (!!event.assistants) {
          while (!inEvent && i < event.assistants.length) {
            //inEvent = event.assistants[i].id.userid!==userObj.userId;
            inEvent = event.assistants[i].userid!==userObj.userid;
          }
        }
        if (!inEvent) {
          let assistant:Assistant = new Assistant(event.eventId, event.creator.userid);
          assistant.lastScan = event.startDate;
          event.assistants.push(assistant);
          await this.eventService.saveAssistants(event.assistants).toPromise();
          //event.assistants.push(userObj);
          let eventSaved:EventObject = await this.eventService.save(event).toPromise();
          console.log(event.eventId);
          console.log(eventSaved.eventId);
          window['plugins'].toast.showLongCenter('Te has inscrito al evento '+ event.name+' de '+event.creator.name);
          this.router.navigate(['/homeEvent']);
          this.eventService.retrieveUserEvents.next();
        } else {
          window['plugins'].toast.showLongBottom('Ya estás inscrito en el evento');
          this.router.navigate(['/homeEvent']);
        }

      }else{
        window['plugins'].toast.showLongBottom('Código de evento no válido');
      }
    }

  }
}
