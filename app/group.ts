import {Session} from "./Session";
import {SmoekStatus} from "./smoek-status";

export class Group {
    id: string;
    name: string;
    sessions: Session[];
    status: SmoekStatus;
}