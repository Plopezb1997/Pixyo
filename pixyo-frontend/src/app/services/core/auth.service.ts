import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../entities/User';
import { BaseService } from './base.service';


const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User>{
  constructor(public http: HttpClient) {
    super(http, '/auth');
   }

  login(user: User): Observable<any> {
    return this.http.post(this.url + '/user/login', user, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(this.url + '/user/register', user, httpOptions);
  }

  checkPhoneNumber(phoneNumber: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + '/phoneNumberExists/'+phoneNumber, httpOptions);
  }
}
