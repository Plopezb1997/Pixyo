import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss'],
})
export class RegisterLoginComponent implements OnInit {

  user: User = new User();
  isRegister: boolean = true;
  hasPic: boolean = false;
  existsNumber: boolean = null;
  formlogin: FormGroup;
  faces: [];
  facePics = [];

  constructor(private cd: ChangeDetectorRef,
    private authservice: AuthService,
    private router: Router,
    private authService: AuthService,
    private nativeStorage: NativeStorage,
    private camera: Camera,
    private file: File,
    private photoLibrary: PhotoLibrary,
    public variablesService: VariablesService,
    public utilService:UtilService
    //private device:Device
  ) { }

  ngOnInit() {
    window['user'] = this.user;
    window['hasPic'] = this.hasPic;
    window['facePics'] = this.facePics;
   }

  switchMode() {
    this.isRegister = !this.isRegister;
    //this.cd.detectChanges();
  } 
  cameraCallback(imageData) {
    var image = document.getElementById('myImage');
    console.log(image);
    //this.user = "data:image/jpeg;base64," + imageData;
  }
  async register() {
    if (!this.utilService.isEmpty(this.user.name)) {
      this.authService.register(this.user).subscribe(result => {
        this.nativeStorage.setItem('user', JSON.stringify(result))
          .then(
            () => console.log('Stored user'),
            error => console.error('Error storing user', error)
          );
        this.router.navigate(['/homeEvent']);
      });
    }else{
      window['plugins'].toast.showshortBottom('Introduce el nombre');
    }
  }

  processLibrary(result) {

    let library = result.library;
    console.log(result.library)
    this.photoLibrary.getPhoto(library, (fileBase64) => {
      this.user.face = fileBase64;
    });

  }

  loadPhoto() {
    if (true) {
      //this.fromCameraBytes();
      this.fromCameraUrl();
    } else {
      console.log(68);
      this.photoLibrary.getLibrary(
        this.processLibrary,
        function (err) {
          console.log(err);
        },
        {
          itemsInChunk: 100, // Loading large library takes time, so output can be chunked so that result callback will be called on
          chunkTimeSec: 0.5, // each X items, or after Y secons passes. You can start displaying photos immediately.
          useOriginalFileNames: false, // default, true will be much slower on iOS
          maxItems: 1, // limit the number of items to return
        }
      );

    }
  }

  private fromCameraBytes() {
    const options: CameraOptions = {
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true

    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      this.user.face = imageData;
      this.hasPic = true;
    }, (err) => {
      console.log('getPicture' + err);
    });
  }

  private async fromCameraUrl() {
    const options: CameraOptions = {
      quality: 95,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
    let image;
    let imageData = await this.camera.getPicture(options);
    window['plugins'].Base64.encodeFile(imageData, this.withBase64);
    //window['resolveLocalFileSystemURL'](imageData, this.resolveLocalFileSystemURL,this.errorHandling);
    //let fileEntry:FileEntry = await this.file.resolveLocalFilesystemUrl(imageData);
    //fileEntry.getMetadata( );
    setInterval(()=>{
      setTimeout(()=>{
        this.cd.detectChanges();
        this.hasPic = window['hasPic'];
      }, 1000)
    })
  }

  private withBase64(base64: any) {
    console.log('START withBase64');
    var patt = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    console.log("is valid base64? " + patt.test(base64.split(",", 2)[1])); // false!
    console.log('file base64 encoding: ' + base64);
    window['user'].face = base64;
    window['hasPic'] = true;
    window['facePics'].push(base64);
    console.log('END withBase64');
  }

  resolveLocalFileSystemURL(fileEntry) {
    console.log('START resolveLocalFileSystemURL');      
    fileEntry['file'](function (file) {
      var reader = new FileReader();

      reader.onloadend = function (evt) {

        // test base64 is valid
        var patt = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        var b64 = JSON.stringify(evt.target.result).split(",", 2)[1];
        console.log("is valid base64? " + patt.test(b64)); // false!
        console.log('Readed File: ' + b64)
        //var bytes = atob(b64); // Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
      };

      //reader.readAsText(file); 
      reader.readAsDataURL(file);
    },
      function (err) {
        console.error(err);
      });
      console.log('END resolveLocalFileSystemURL');
  }

  errorHandling(error){
    console.error(error);
  }

  // register() {    
  //   this.authService.register(this.user).then(result => {
  //     this.nativeStorage.setItem('user', JSON.stringify(result))
  //       .then(
  //         () => console.log('Stored user'),
  //         error => console.error('Error storing user', error)
  //       );
  //     this.router.navigate(['/homeEvent']);
  //   });
  // }

  // async login() {
  //   // if(this.formlogin.valid){
  //   let result = await this.authservice.login(this.user).toPromise();
  //   if (result) {
  //     this.router.navigate(['/homeEvent']);
  //   }
  //   // }
  // }

  log() {
    console.log(this.user);
  }

  // exists Phone() {
  //   if (this.isRegister) {
  //     this.authservice.checkPhoneNumber(this.user.phoneNumber).subscribe(result => {
  //       if (result) {
  //         this.exists Number = true;
  //       } else {
  //         this.exists Number = false;
  //       }
  //     });
  //   }
  // }



}
