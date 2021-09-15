import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class UtilService{

    constructor(){}

    public isEmpty(object):boolean{
        if(!object){
            return true;
        }
        if(object == null){
            return true;
        }
        if(object == undefined){
            return true;
        }
        if(typeof object == 'string'){
            if(object === ''){
                return true;
            }
            if(object.trim() === ''){
                return true;
            }
        }
        return false;
    }

    public dateBefore(start:Date, end:Date):boolean{
        if(start.getMilliseconds()<end.getMilliseconds()){
            return true;
        }else{
            return false;
        }
    }
    public nowBetween(start:Date, end:Date):boolean{
        if(start.getMilliseconds()>(new Date().getMilliseconds())){
            return false;
        }
        if(end.getMilliseconds()<(new Date().getMilliseconds())){
            return false;
        }
        return true;
    }
}
  