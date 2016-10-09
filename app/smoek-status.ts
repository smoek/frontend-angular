import {Session} from "./Session";

export class SmoekStatus {
    requested: boolean;
    confirmed: boolean;
    supporters: Session[];
    expiresAt: Date;
}