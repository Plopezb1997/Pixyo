import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showshortBottom(message:string ){
    window['plugins'].toast.showshortBottom(message);
  }
}
