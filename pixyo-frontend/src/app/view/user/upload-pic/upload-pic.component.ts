import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upload-pic',
  templateUrl: './upload-pic.component.html',
  styleUrls: ['./upload-pic.component.scss'],
})
export class UploadPicComponent implements OnInit {

  user:User;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userTemp'));
  }

  saveUser(){
    this.authService.register(this.user).subscribe(result=>{
      this.router.navigate(['/homeEvent']);
    });
  }

}
