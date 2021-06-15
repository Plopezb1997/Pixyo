import { User } from './User';

export class Event {
    eventId: number;
    name: string;
    status: string;
    location: string;
    eventCode: string;
    startDate: Date;
    endDate: Date;
    creator: User;
}