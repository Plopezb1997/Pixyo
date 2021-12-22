import { EventObject } from "./Event";
import { User } from "./User";


export class Assistant {
    //id: {eventid:string, userid:string};
    eventid:string; 
    userid:string
    event: EventObject;
    user: User;
    lastScan:Date;

    /*constructor(eventid: string, userid:string){
        this.id = {eventid, userid};
    }*/

    constructor(eventid: string, userid:string){
        this.eventid = eventid;
        this.userid =  userid;
    }
}
