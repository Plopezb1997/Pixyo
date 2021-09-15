import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Platform } from '@ionic/angular';
import { AndroidService } from './services/core/android.service';
import { VariablesService } from './services/core/variables.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(androidService: AndroidService, public platform: Platform, public variablesService: VariablesService) {
    //if (Device.platform) {
      this.platform.ready().then(() => {
        androidService.getPermission('INTERNET');
        androidService.getPermission('ACCESS_NETWORK_STATE');
        androidService.getPermission('CAMERA');
        variablesService.cordova.plugins.backgroundMode.setDefaults({ silent: true });
        variablesService.cordova.plugins.backgroundMode.on('activate', function () {
          variablesService.cordova.plugins.backgroundMode.disableWebViewOptimizations();
        });
        variablesService.cordova.plugins.backgroundMode.enable();
        variablesService.cordova.plugins.photoLibrary.requestAuthorization(
          function () {
            console.log('Tengo permisos a galería');
          },
          function (err) {
            console.log('No tengo putos permisos a galería');
          }, // if options not provided, defaults to {read: true}.
          {
            read: true,
            write: true
          }
        );
      })
    //}
  }
}
