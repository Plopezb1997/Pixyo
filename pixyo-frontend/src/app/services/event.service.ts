import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

const USER_API = 'http://localhost:8080/user';
@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService<Event>{

  constructor(public http:HttpClient) {
    super(http, 'event');
   }
}
