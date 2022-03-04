import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './core/base.service';
import { EventObject } from 'src/app/entities/EventObject';
import { EventFilter } from '../filters/event.filter';
import { Observable, Subject } from 'rxjs';
import { Assistant } from '../entities/Assistant';
const USER_API = 'http://localhost:8080/user';
@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<EventObject>{

  constructor(public http:HttpClient) {
    super(http, '/event');
   }

   retrieveUserEvents: Subject<any> = new Subject();

   findJoinedEvents(filter:EventFilter):Observable<EventObject[]>{
    const getEntityUrl = this.url + '/findJoinedEvents';
    return this.http.post<EventObject[]>(getEntityUrl, filter, this.httpOptions);
}

saveAssistants(assistants:Assistant[]){
  const getEntityUrl = this.url + '/saveAssistants';
    return this.http.post<EventObject[]>(getEntityUrl, assistants, this.httpOptions);
}
   
}
