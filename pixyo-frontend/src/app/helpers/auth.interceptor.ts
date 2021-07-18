import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenstorageService: TokenStorageService) { }

  intercept(req: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenstorageService.getToken();
    if (token != null) {
      req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
    }
    /*if(req.method == 'OPTIONS'){
      req.headers.set("Access-Control-Allow-Origin", "*");
      req.headers.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
      req.headers.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }*/
    authReq = req.clone({ headers: req.headers});
    return httpHandler.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
