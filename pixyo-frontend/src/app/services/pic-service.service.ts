import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pic } from '../entities/Pic';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class PicService extends BaseService<Pic>{

  constructor(public http:HttpClient) {
    super(http, '/pic');
   }

   public findByEventId(eventid:string):Observable<Pic[]>{
    const findPicsByEventIdUrl = this.url + '/findPicsByEventId/'+eventid;
     return this.http.get<Pic[]>(findPicsByEventIdUrl, this.httpOptions);
   }

   //public uploadFace()

 }
