import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  //styleUrls: ['./register-login.component.scss'],
})
export class RegisterLoginComponent implements OnInit {

  isRegister:boolean=true;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {}

  switchMode(){
    this.isRegister = !this.isRegister;
    this.cd.detectChanges();
  }

}