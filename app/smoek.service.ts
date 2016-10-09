import {Injectable} from "@angular/core";
import {Session} from "./Session";
import {Group} from "./group";
import {Http, Headers} from "@angular/http";
import {SmoekStatus} from "./smoek-status";

@Injectable()
export class SmoekService {
    private baseUrl = 'http://172.17.0.2/web/app_dev.php';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    smoke(group: Group, session: Session): Promise<SmoekStatus> {
        const url = `${this.baseUrl}/group/${group.id}/session/${session.id}/smoek`;
        return this.http
            .post(url, JSON.stringify(group), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    unsmoke(group: Group, session: Session): Promise<SmoekStatus> {
        const url = `${this.baseUrl}/group/${group.id}/session/${session.id}/smoek`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}