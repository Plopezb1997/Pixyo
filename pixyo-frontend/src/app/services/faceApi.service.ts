import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {
  apiToken='6cd7b43343234fd289ddbd8f9e761b19';
  baseUrl = 'https://pixyo.cognitiveservices.azure.com/';
  contentType:'multipart/form-data;'; //boundary)
  personGroupBaseId = 'test';
  constructor(public http:HttpClient) { }

  private setHeaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Ocp-Apim-Subscription-Key', this.apiToken);
    headers.set('content-type', this.contentType);
    return headers;
  }
  
  createGroup(name:string):Observable<Object>{
    let url = this.baseUrl + 'face/v1.0/persongroups/'+name?name:this.personGroupBaseId;
    let body = {
      name: +name?name:this.personGroupBaseId
    };
    let headers:HttpHeaders = this.setHeaders();
    return this.http.put(url, body, {headers:headers});
  }

  createPerson(name:string, personGroupId?:string):Observable<Object>{
    let url = this.baseUrl + 'face/v1.0/persongroups/'+personGroupId?personGroupId:this.personGroupBaseId+'/persons';
    let body = {
      name: name
    };
    let headers:HttpHeaders = this.setHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  addFaceToPerson(personId:string, base64Image:string, personGroupId?:string):Observable<Object>{
    let url = this.baseUrl + 'face/v1.0/persongroups/'+personGroupId?personGroupId:this.personGroupBaseId+'/persons/'+personId+'/persistedfaces';
    let body = base64Image;
    let headers:HttpHeaders = this.setHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  /**
   * not working 
   * */
  movePerson(personGroupId:string, rawPhoto:string):Observable<Object>{
    let url = this.baseUrl + 'face/v1.0/persongroups/'+personGroupId+'/persons/';
    let body = {
      name: name
    };
    let headers:HttpHeaders = this.setHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  detectPeople(base64Image:string){
    let url = this.baseUrl + 'face/v1.0/detect';
    let body = {
      image:base64Image
    };
    let headers: HttpHeaders = this.setHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  recognizePeople(base64Image:string):Observable<Object>{
    let url = this.baseUrl + 'face/v1.0/identify';
    let body = {
      photo:base64Image
    };
    let headers: HttpHeaders = this.setHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  
}
