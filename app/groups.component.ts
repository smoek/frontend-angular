import {Component, OnInit} from "@angular/core";
import {GroupsService} from "./groups.service";
import {Group} from "./group";
import {MySessionsService} from "./my-sessions.service";

@Component({
    moduleId: module.id,
    selector: 'groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css']
})

export class GroupsComponent implements OnInit {
    groups: Group[];
    selectedGroup: Group;

    constructor(
        private groupsService: GroupsService,
        private mySessionsService: MySessionsService
    ) { }

    ngOnInit(): void {
        this.getGroups();
    }

    onSelect(group: Group): void {
        this.selectedGroup = group;
    }

    getGroups() {
        this.groupsService.getGroups().then(groups => {
            this.groups = groups;
        });
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.groupsService.create(name)
            .then(group => {
                this.groups.push(group);
            })
    }
}