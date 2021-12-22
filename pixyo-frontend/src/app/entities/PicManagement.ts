import { Pic } from "./Pic";
import { User } from "./User";

export class PicManagement {
    id: {picid:string, userid:string};
    pic: Pic;
    user: User;
    appears: boolean;
    downloaded: boolean;
}
