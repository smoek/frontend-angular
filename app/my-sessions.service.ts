import {Injectable, OnInit} from "@angular/core";
import {Session} from "./Session";
import {Group} from "./group";

@Injectable()
export class MySessionsService {
    private mySessions = {};

    constructor() {
        this.init();
    }

    init(): void {
        const mySessions = localStorage.getItem('my-sessions');
        if (mySessions) {
            this.mySessions = JSON.parse(mySessions);
        }
    }

    add(group: Group, session: Session): void {
        this.mySessions[group.id] = session;
        localStorage.setItem('my-sessions', JSON.stringify(this.mySessions));
    }

    has(group: Group): boolean {
        return !!this.mySessions[group.id];
    }

    get(group: Group): Session {
        return this.mySessions[group.id];
    }

    remove(group: Group) {
        delete this.mySessions[group.id];
        localStorage.setItem('my-sessions', JSON.stringify(this.mySessions));
    }

    smoekRequested(group: Group): boolean {
        const session = this.get(group);

        /* TODO: There's gotta be an easier way to see if an object is in an array */
        return (!!group.status.supporters.find(s => {
            return JSON.stringify(s) === JSON.stringify(session);
        }));
    }
}