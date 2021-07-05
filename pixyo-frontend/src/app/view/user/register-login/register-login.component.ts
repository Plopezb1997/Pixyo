import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/entities/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
/*import * as $ from 'jquery';
import 'jqueryui';*/
@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
})
export class RegisterLoginComponent implements OnInit {

  user:User = new User();
  isRegister:boolean=true;
  disable:boolean=null;

  constructor(private cd: ChangeDetectorRef,
          private authservice: AuthService,
          private router: Router
    ) { }

  ngOnInit() {}

  switchMode(){
    this.isRegister = !this.isRegister;
    //this.cd.detectChanges();
  }

  async register(){
    sessionStorage.setItem("userTemp", JSON.stringify(this.user));
    this.router.navigate(['/uploadPic']);
    
  }

  async login(){
    let result = await this.authservice.login(this.user).toPromise();
    if(result){
      this.router.navigate(['/homeEvent']);
    }
  }

  log(){
    console.log(this.user);
  }

  existsPhone(){
    if(this.isRegister){
      this.authservice.checkPhoneNumber(this.user.phoneNumber).subscribe(result=>{
        if(result){
          this.disable = true;
        }else{
          this.disable = null;
        }
      });
    }
  }

  

}
