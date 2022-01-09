import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private camera: Camera) { }

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

    window['resolveLocalFileSystemURL'](imageData, this.readFile, this.errorHandling);
    //let fileEntry:FileEntry = await this.file.resolveLocalFilesystemUrl(imageData);
    //fileEntry.getMetadata( );

    /*setInterval(() => {
      setTimeout(() => {
        this.cd.detectChanges();
        this.hasPic = window['hasPic'];
        if (this.hasPic) {
          this.writeFile(window['currentPic'], faceType);
          this.hasPic = false;
          window['hasPic'] = false;
        }
      }, 1000)
    })*/
  }

  private withBase64(base64: any) {
    console.log('START withBase64');
    //let object = JSON.parse(base64);
    var patt = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    console.log("is valid base64? " + patt.test(base64.split(",", 2)[1])); // false!
    console.log('file base64 encoding: ' + base64);

    console.log('END withBase64');
  }

  async readFile(fileEntry) {
    console.log('START resolveLocalFileSystemURL');
    fileEntry['file'](function (file) {   
      var reader = new FileReader();

      reader.onloadend = function (evt) {
        var b64 = JSON.stringify(evt.target.result).split(",", 2)[1];
        window['currentPic'] = b64;
        window['hasPic'] = true;
      };
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


}
