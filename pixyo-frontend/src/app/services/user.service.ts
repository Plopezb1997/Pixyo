import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends BaseService<Event>{

  constructor(public http:HttpClient) {
    super(http, 'user');
   }
}
