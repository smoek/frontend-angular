import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {GroupsService} from "./groups.service";
import {GroupsComponent} from "./groups.component";
import './rxjs-extensions';
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {MySessionsService} from "./my-sessions.service";
import {GroupDetailComponent} from "./group-detail.component";
import {FormsModule} from "@angular/forms";
import {SmoekService} from "./smoek.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        GroupsComponent,
        GroupDetailComponent
    ],
    providers: [
        GroupsService,
        MySessionsService,
        SmoekService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {

}