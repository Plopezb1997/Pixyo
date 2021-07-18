import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../filters/filter';

const USER_API = 'http://localhost:8080';

const httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

    constructor(public http: HttpClient, protected url:string) { }

    save(entity:T):Observable<Object>{
        const getEntityUrl = this.url + '/save';
        return this.http.post(getEntityUrl, entity, httpOptions);
    }

    find(filter:Filter):Observable<Object>{
        const getEntityUrl = this.url + '/find';
        return this.http.post(getEntityUrl, filter, httpOptions);
    }
    
}
