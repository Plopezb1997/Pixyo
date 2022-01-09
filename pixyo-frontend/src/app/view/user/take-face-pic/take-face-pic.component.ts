import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/entities/User';
import { AuthService } from 'src/app/services/core/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Device } from '@ionic-native/device';

/*import * as $ from 'jquery';
import 'jqueryui';*/
import { VariablesService } from 'src/app/services/core/variables.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-take-face-pic',
  templateUrl: './take-face-pic.component.html',
  styleUrls: ['./take-face-pic.component.scss'],
})
export class TakeFacePicComponent implements OnInit {
  @Input() expression:string;
  @Output() takePic = new EventEmitter<string>();
  icon:string;
  icons = {
    normal:"fas fa-meh-blank",
    smile:"fas fa-smile-beam",
    profile:"fas fa-arrow-right",
    top:"fas fa-arrow-down",
    bottom:"fas fa-arrow-up",
    teeth:"fas fa-laugh",
    posse:"fas fa-kiss-wink-heart",
    serious:"fas fa-meh",
    tongue:"fas fa-grin-tongue-wink",
    
  }
  constructor() { }

  ngOnInit() {
    this.icon = this.icons[this.expression];
  }

  takePicTrigger(){
    this.takePic.next(this.expression);
  }

}
