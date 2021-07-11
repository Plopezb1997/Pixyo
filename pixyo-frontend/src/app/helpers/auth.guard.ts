import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: TokenStorageService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}