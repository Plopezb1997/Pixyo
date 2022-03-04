import { Assistant } from './Assistant';
import { User } from './User';

export class EventObject {
    eventId: string;
    name: string;
    status: string;
    location: string;
    eventCode: string;
    startDate: Date;
    endDate: Date;
    creator: User;
    assistants:Assistant[];
}