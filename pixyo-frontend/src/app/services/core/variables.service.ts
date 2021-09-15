import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  window = window;
  cordova = window['cordova'];
  convertFileSrc;
  androidStorage = '/storage/emulated/0/Android';
  STATUS ={
    CREATION:'C',
    ACTIVE:'A',
    FINISHED:'F'
  }
  constructor(public platform: Platform) {
    if (Device.platform) {
      this.platform.ready().then(() => {
        this.convertFileSrc = window['Ionic'].WebView.convertFileSrc;
      })
    }
  }
}
