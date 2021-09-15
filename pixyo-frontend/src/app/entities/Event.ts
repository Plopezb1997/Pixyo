import { User } from './User';

export class EventObject {
    eventId: number;
    name: string;
    status: string;
    location: string;
    eventCode: string;
    startDate: Date;
    endDate: Date;
    creator: User;
    assistants:User[];
}