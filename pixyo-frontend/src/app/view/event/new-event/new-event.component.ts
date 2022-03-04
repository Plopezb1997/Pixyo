import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Assistant } from 'src/app/entities/Assistant';
import { EventObject } from 'src/app/entities/EventObject';
import { EventService } from 'src/app/services/event.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
})
export class NewEventComponent implements OnInit {

  event: EventObject = new EventObject();
  constructor(private eventService: EventService,
    private nativeStorage: NativeStorage,
    private router: Router,
    public utilService: UtilService) { }

  ngOnInit() { }

  async createEvent() {
    //TODO AÑADIR VALIDACIONES POR FORMULARIO
    if (this.validate()) {
      let user = await this.nativeStorage.getItem('user')
      if (user) {
        this.event.creator = JSON.parse(user);
        //TODO FIX PARA INTERNACIONAL
        this.event.status = this.utilService.dateBefore(new Date(), this.event.endDate)&&this.utilService.dateBefore(this.event.startDate, new Date())?'A':'C';
        this.event.assistants =[];
        let event: EventObject = await this.eventService.save(this.event).toPromise();
        let assistant:Assistant = new Assistant(event.eventId, event.creator.userid);
        assistant.lastScan = event.startDate;
        event.assistants.push(assistant);
        await this.eventService.saveAssistants(event.assistants).toPromise();
        localStorage.setItem('currentEvent', event.eventCode);
        this.router.navigate(['/keyEvent']);
      }
    }
  }


  private validate(): boolean {
    let valid = !this.utilService.isEmpty(this.event.name)
      && !this.utilService.isEmpty(this.event.startDate)
      && !this.utilService.isEmpty(this.event.endDate);
    if (!valid) {
      window['plugins'].toast.showShortBottom('Todos los campos son obligatorios, por favor, rellénelos');
      return false;
    }
    if((typeof this.event.startDate)=='string'){
      this.event.startDate = new Date(this.event.startDate);
    }
    if((typeof this.event.endDate)=='string'){
      this.event.endDate = new Date(this.event.endDate);
    }
    valid = this.utilService.dateBefore(this.event.startDate, this.event.endDate);
    if (!valid) {
      window['plugins'].toast.showShortBottom('La fecha y hora de fin no puede ser anterior a la de inicio');
      return false;
    }
    valid = !this.utilService.dateBefore(this.event.endDate, new Date());
    if (!valid) {
      window['plugins'].toast.showShortBottom('Aún no se ha implementado la funcionalidad para eventos terminados, estate atento ;)');
      return false;
    }
    return true;
  }
}
