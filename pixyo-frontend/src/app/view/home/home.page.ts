import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public router: Router,
    public platform: Platform,
    private nativeStorage: NativeStorage) { }

  ngOnInit() {
    setTimeout(() =>
      this.platform.ready().then(() => {
        if (Device.platform) {
          this.nativeStorage.getItem('user')
            .then(
              (result) => {
                /*if (result) {
                  console.log('Stored user' + JSON.stringify(result));
                  this.router.navigate(['/homeEvent']);
                }else{*/
                  console.log('New user');
                  this.router.navigate(['/register']);
                //}
              },
              error => {
                console.error('Error storing user', error)
                if(error.code ==2){
                  this.router.navigate(['/register']);
                }
              }
            ).catch(error=>{
              console.log('New user');
                  this.router.navigate(['/register']);
            });
        }else{
          this.router.navigate(['/register']);
        }
      }), 3000);

  }

}
