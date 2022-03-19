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
import { FaceApiService } from 'src/app/services/faceApi.service';
import { ToastService } from 'src/app/services/toast.service';
import { FilesService } from 'src/app/services/files.service';
import { CameraService } from 'src/app/services/camera.service';
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
  facePics = {};
  enoughPics: boolean = false;

  constructor(private cd: ChangeDetectorRef,
    private authservice: AuthService,
    private router: Router,
    private authService: AuthService,
    private nativeStorage: NativeStorage,
    private camera: Camera,
    private file: File,
    private photoLibrary: PhotoLibrary,
    public variablesService: VariablesService,
    public utilService: UtilService,
    public faceApi: FaceApiService,
    public toast: ToastService,
    public fileService: FilesService,
    public cameraService: CameraService
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
    let canRegister: boolean = true;
    if (!this.utilService.isEmpty(this.user.name)) {
      canRegister = canRegister;
    } else {
      window['plugins'].toast.showshortBottom('Introduce el nombre');
      canRegister = false;
    }
    await this.checkEnoughPics();
    if (this.enoughPics) {
      canRegister = canRegister;
    } else {
      canRegister = false;
    }
    if (canRegister) {
      await this.sendToLuxand();
      this.authService.register(this.user).subscribe(result => {
        this.nativeStorage.setItem('user', JSON.stringify(result))
          .then(()=>this.router.navigate(['/homeEvent']),
            error => console.error('Error storing user', error)
          );
        
      });
    }
  }

  async sendToLuxand() {

    console.log('Stored user');
    let entries = await this.fileService.listDirFromRoot('Pixyo/ProfileImages');
    this.cameraService.readFile(entries[0]);

    
      setTimeout(() => {
        this.cd.detectChanges();
        this.hasPic = window['hasPic'];
        if (this.hasPic) {
          this.faceApi.createPerson(this.user.name).subscribe(object=>{
            this.user.luxandid = object['personId'];
            this.addImagesToPerson(object['personId']);  
          });
          this.hasPic = false;
          window['hasPic'] = false;
        }
      }, 1000)
    


  }
  async addImagesToPerson(id:string) {
    let entries = await this.fileService.listDirFromRoot('Pixyo/ProfileImages');
    for (let i = 1; i < entries.length; i++) {
      this.cameraService.readFile(entries[i]);
      setInterval(() => {
        setTimeout(() => {
          this.cd.detectChanges();
          this.hasPic = window['hasPic'];
          if (this.hasPic) {
            this.faceApi.addFaceToPerson(id, window['currentPic']).subscribe();
            this.hasPic = false;
            window['hasPic'] = false;
          }
        }, 1000)
      })
    }
  }

  async checkEnoughPics() {
    let entries = await this.fileService.listDirFromRoot('Pixyo/ProfileImages');
    if (entries.length < 3) {
      this.enoughPics = false;
    } else {
      for (var face in this.variablesService.registerPics) {
        let flagExists = false;
        if (this.variablesService.registerPics[face].demandant) {
          entries.forEach(entry => {
            if (entry.name.toLowerCase().split('.jpg')[0] == face) {
              flagExists = true;
            }
          });
        }else{
          flagExists=true;
        }
        if (!flagExists) {
          window['plugins'].toast.showshortBottom('Falta la cara ' + face);
          break;
        }
        this.enoughPics = true;
      }
    }
  }

  processLibrary(result) {

    let library = result.library;
    console.log(result.library)
    this.photoLibrary.getPhoto(library, (fileBase64) => {
      this.user.face = fileBase64;
    });

  }

  loadPhoto(faceType: string) {
    //if (true) {
    //this.fromCameraBytes();
    this.fromCameraUrl(faceType);
    /*} else {
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
  
    }*/
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

  private async fromCameraUrl(faceType) {
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
    window['faceType'] = faceType;
    //let params = JSON.stringify({imageData:imageData, function:this.writeFile})
    window['plugins'].Base64.encodeFile(imageData, this.withBase64);

    window['resolveLocalFileSystemURL'](imageData, this.resolveLocalFileSystemURL, this.errorHandling);
    //let fileEntry:FileEntry = await this.file.resolveLocalFilesystemUrl(imageData);
    //fileEntry.getMetadata( );

    setInterval(() => {
      setTimeout(() => {
        this.cd.detectChanges();
        this.hasPic = window['hasPic'];
        if (this.hasPic) {
          this.writeFile(window['currentPic'], window['faceType']);
          this.hasPic = false;
          window['hasPic'] = false;
        }
      }, 1000)
    })
  }

  private withBase64(base64: any) {
    console.log('START withBase64');
    //let object = JSON.parse(base64);
    var patt = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    console.log("is valid base64? " + patt.test(base64.split(",", 2)[1])); // false!
    console.log('file base64 encoding: ' + base64);

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
        window['currentPic'] = b64;
        //object.function( base64, window['faceType']);
        window['hasPic'] = true;


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

  errorHandling(error) {
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


  async writeFile(dataObj, fileName: string) {
    let directoryEntry = await this.createOrAddFolderTo('Pixyo', 'storage/emulated/0/');
    directoryEntry = await this.createOrAddFolderTo('ProfileImages', 'storage/emulated/0/Pixyo/');


    fileName += '.jpg';
    dataObj = this.fileService.base64toBlob(dataObj.substr(0, dataObj.length - 1), 'image/jpeg');
    //dataObj = atob(dataObj);

    directoryEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function (fileWriter) {//mirar como ir al internal storage

        fileWriter.onwriteend = function () {
          console.log("Successful file write...");
          // readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
          console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        let blob: Blob;
        if (!dataObj) {
          blob = new Blob(['some file data'], { type: 'text/plain' });
        }/*else{
          blob = new Blob([dataObj], {type:'image/jpeg'});
        }*/

        fileWriter.write(dataObj);
      });

    }, this.errorHandling);
  }

  private async createOrAddFolderTo(name: string, folder: string) {
    let directoryEntry;
    try {
      directoryEntry = await this.file.resolveDirectoryUrl('file:///' + folder + name);
    } catch (e) {
      directoryEntry = await this.file.resolveDirectoryUrl('file:///' + folder);
      directoryEntry.getDirectory(name, { create: true, exclusive: false }, function () {
        console.log("Successful folder write...");
        // readFile(fileEntry);
      }, function (e) {
        console.log("Failed folder write: " + e.toString());
      });
      directoryEntry = await this.file.resolveDirectoryUrl('file:///' + folder + name);
    }
    return directoryEntry;
  }

  
}
