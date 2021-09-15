import { Injectable } from "@angular/core";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

@Injectable({
    providedIn: 'root'
})
export class AndroidService{
    constructor(private androidPermissions: AndroidPermissions){

    }

    getPermission(permission: string) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION[permission]).then(
            result => console.log('Has '+permission+' permission?', result.hasPermission),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION[permission])
        );
    }
}