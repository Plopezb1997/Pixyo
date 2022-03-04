import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  profileImages= 'Pixyo/ProfileImages'
  constructor(private file: File) { }

  async listDirFromRoot(folder:string){
    return await this.file.listDir('file:///storage/emulated/0/', folder);
  }

  base64toBlob(base64Data, contentType) {
    var byteArrays;
    contentType = contentType || '';
    byteArrays= this.base64ToByteArray(base64Data);
    return new Blob(byteArrays, { type: contentType });
  }

  base64ToByteArray(base64Data: string):Array<Uint8Array> {
    
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return byteArrays;
  }

  async readDataInBase64(fullPath:string){
    let file = await this.file.readAsDataURL('file:///storage/emulated/0/', fullPath.substr(1));
    return file.split(",", 2)[1]
  }
}
