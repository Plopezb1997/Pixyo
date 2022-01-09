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
  STATUS = {
    CREATION: 'C',
    ACTIVE: 'A',
    FINISHED: 'F'
  }

  picFormat: 'image/jpeg';

  registerPics = {
      normal: {
        icon:"fas fa-meh-blank",
        demandant:true,
        color:'primary'
      },
      smile:  {
        icon:"fas fa-smile-beam",
        demandant:true,
        color:'primary'
      },
      profile:  {
        icon:"fas fa-arrow-right",
        demandant:true,
        color:'primary'
      },
      top:  {
        icon:"fas fa-arrow-down",
        demandant:false,
        color:'tertiary'
      },
      bottom:  {
        icon:"fas fa-arrow-up",
        demandant:false,
        color:'tertiary'
      },
      teeth:  {
        icon:"fas fa-laugh",
        demandant:false,
        color:'tertiary'
      },
      posse:  {
        icon:"fas fa-kiss-wink-heart",
        demandant:false,
        color:'tertiary'
      },
      serious:  {
        icon:"fas fa-meh",
        demandant:false,
        color:'tertiary'
      },
      tongue:  {
        icon:"fas fa-grin-tongue-wink",
        demandant:false,
        color:'tertiary'
      }
  }
  constructor(public platform: Platform) {
    if (Device.platform) {
      this.platform.ready().then(() => {
        this.convertFileSrc = window['Ionic'].WebView.convertFileSrc;
      })
    }
  }
}
