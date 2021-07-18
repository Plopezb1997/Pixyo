import { Filter } from "./filter";

export class UserFilter extends Filter{
    userId: number;
    name: string;
    password: string;
    face: string;
    phoneNumber: string;
    email: string;
    sharedPicseq: number;
    sharedPicsge: number;
    sharedPicsle: number;
}
