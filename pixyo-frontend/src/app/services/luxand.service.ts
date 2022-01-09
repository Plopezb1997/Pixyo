import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LuxandService {
  apiToken='48c2a5ce953d4e3b87abb27f2bcc11c5';
  baseUrl = 'https://api.luxand.cloud/';
  contentType:'multipart/form-data;'; //boundary)
  constructor(public http:HttpClient) { }
  
  createPerson(name:string, rawPhoto:string):Observable<Object>{
    let url = this.baseUrl + 'subject/v2';
    let body = {
      name: name,
      photo:rawPhoto,
      store:1,
    };
    let headers:HttpHeaders = this.setHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  addFaceToPerson(id:string, rawPhoto:string):Observable<Object>{
    let url = this.baseUrl + 'subject/'+id;
    let body = {
      photo:rawPhoto,
      store:1,
    };
    let headers:HttpHeaders = this.setHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  recognizePeople(rawPhoto:Blob):Observable<Object>{
    let url = this.baseUrl + '/photo/search';
    let body = {
      photo:rawPhoto
    };
    let headers: HttpHeaders = this.setHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  private setHeaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('token', this.apiToken);
    headers.set('content-type', this.contentType);
    return headers;
  }
}
