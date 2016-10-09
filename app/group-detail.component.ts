import {Component, Input} from "@angular/core";
import {Group} from "./group";
import {GroupsService} from "./groups.service";
import {MySessionsService} from "./my-sessions.service";
import {SmoekService} from "./smoek.service";
import {Session} from "./Session";

@Component({
    moduleId: module.id,
    selector: 'group-detail',
    templateUrl: 'group-detail.component.html',
    styleUrls: ['group-detail.component.css']
})

export class GroupDetailComponent {
    @Input() group: Group;
    sessionName: string;

    constructor(private groupsService: GroupsService,
                private mySessionsService: MySessionsService,
                private smoekService: SmoekService) {
    }

    join(group: Group): void {
        this.groupsService.join(group, this.sessionName)
            .then(session => {
                this.mySessionsService.add(group, session);
                group.sessions.push(session);
            });
    }

    leave(group: Group, session: Session) {
        this.groupsService.leave(group, session)
            .then(() => {
                this.mySessionsService.remove(group);
                group.sessions = group.sessions.filter((s => {
                    return s !== session;
                }));
            })
    }

    smoek(group: Group): void {
        const session = this.mySessionsService.get(group);
        this.smoekService.smoke(group, session)
            .then(smoekStatus => {
                group.status = smoekStatus;
            });
    }

    unsmoek(group: Group, session: Session) {
        const session = this.mySessionsService.get(group);
        this.smoekService.unsmoke(group, session)
            .then(smoekStatus => {
                group.status = smoekStatus;
            })
    }
}