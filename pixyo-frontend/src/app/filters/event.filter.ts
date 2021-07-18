import { User } from "../entities/User";
import { Filter } from "./filter";


export class EventFilter extends Filter{
    eventId: number;
    name: string;
    status: string;
    location: string;
    eventCode: string;
    startDateeq: Date;
    startDatege: Date;
    startDatele: Date;
    assistantsInEvents:User[];
    endDateeq: Date;
    endDatege: Date;
    endDatele: Date;
    title: string;
    creator: User;
}