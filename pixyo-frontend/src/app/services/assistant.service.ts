import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assistant } from '../entities/Assistant';
import { BaseService } from './core/base.service';

@Injectable({
  providedIn: 'root'
})
export class AssistantService extends BaseService<Assistant>{

  constructor(public http:HttpClient) {
    super(http, '/assistant');
   }


}
