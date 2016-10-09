import {GroupsComponent} from "./groups.component";
import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {GroupsService} from "./groups.service";
import {By} from "@angular/platform-browser";
import {Group} from "./group";
import {SmoekStatus} from "./smoek-status";
import {GroupDetailComponent} from "./group-detail.component";
import {FormsModule} from "@angular/forms";
import {MySessionsService} from "./my-sessions.service";
import {SmoekService} from "./smoek.service";

let comp: GroupsComponent;
let fixture: ComponentFixture<GroupsComponent>;
let de: DebugElement;
let el: HTMLElement;
let groupsService;

describe('GroupsComponent', () => {
    beforeEach(async(() => {

        var groupsServiceStub = {
            getGroups(): Promise<Group[]> {
                return Promise.resolve([]);
            }
        };
        var mySessionsServiceStub = {};
        var smoekServiceStub = {};

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                GroupsComponent,
                GroupDetailComponent
            ],
            providers: [
                {provide: GroupsService, useValue: groupsServiceStub},
                {provide: MySessionsService, useValues: mySessionsServiceStub},
                {provide: SmoekService, useValues: smoekServiceStub}
            ]
        }).compileComponents();

    }));

    it('', () => {

        /*
         * TODO: Put this in beforeEach
        *  For now this does not work due to compileComponents()' asynchronicity
         */
        fixture = TestBed.createComponent(GroupsComponent);
        comp = fixture.componentInstance;

        groupsService = fixture.debugElement.injector.get(GroupsService);

        var group1 = new Group();
        group1.id = 'ABCD-1234';
        group1.name = 'Group 1';
        group1.sessions = [];
        group1.status = new SmoekStatus();

        var group2 = new Group();
        group2.id = 'EFGH-5678';
        group2.name = 'Group 2';
        group2.sessions = [];
        group2.status = new SmoekStatus();

        var groups = [group1, group2];

        var spy = spyOn(groupsService, 'getGroups')
            .and.returnValue(Promise.resolve(groups));

        // trigger change detection to update the view
        fixture.detectChanges();

        fixture.whenStable().then(() => {

            it('should display the header row and all groups', () => {
                expect(fixture.debugElement.query(By.css('table tr')).children.length).toEqual(3);
            });

            it('should display the groups\' names', () => {
                expect(fixture.debugElement.query(By.css('table')).nativeElement.textContent).toContain(group1.name);
            });
        });
    });
});