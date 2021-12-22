import { Injectable } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { User } from "../entities/User";

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(public nativeStorage: NativeStorage) { }

    public isEmpty(object): boolean {
        if (!object) {
            return true;
        }
        if (object == null) {
            return true;
        }
        if (object == undefined) {
            return true;
        }
        if (typeof object == 'string') {
            if (object === '') {
                return true;
            }
            if (object.trim() === '') {
                return true;
            }
        }
        return false;
    }

    public dateBefore(start: Date, end: Date): boolean {
        if (start.getTime() < end.getTime()) {
            return true;
        } else {
            return false;
        }
    }
    public nowBetween(start: Date, end: Date): boolean {
        if (start.getTime() > (new Date().getTime())) {
            return false;
        }
        if (end.getTime() < (new Date().getTime())) {
            return false;
        }
        return true;
    }

    public addDays(date: Date, days: number): Date {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public async getUser(): Promise<User> {
        let user = await this.nativeStorage.getItem('user')
        if (user) {
            return JSON.parse(user);
        }
    }
}
