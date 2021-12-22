import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../filters/filter';

const USER_API = 'https://192.168.1.129:8080';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

    constructor(public http: HttpClient, public url:string) { 

      if(!url){
        this.url = USER_API;
      }else{
        this.url = USER_API+url;
      }
    }
    public httpOptions = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    save(entity:T):Observable<T>{
        const getEntityUrl = this.url + '/save';
        return this.http.post<T>(getEntityUrl, entity, this.httpOptions);
    }

    find(filter:Filter):Observable<T[]>{
        const getEntityUrl = this.url + '/find';
        return this.http.post<T[]>(getEntityUrl, filter, this.httpOptions);
    }
    
}
