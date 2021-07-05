import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../entities/User';

const AUTH_API = 'http://localhost:8080/auth/user';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(AUTH_API + '/login', user, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(AUTH_API + '/register', user, httpOptions);
  }

  checkPhoneNumber(phoneNumber: string): Observable<any> {
    return this.http.get(AUTH_API + '/phoneNumberExists/'+phoneNumber, httpOptions);
  }
}
