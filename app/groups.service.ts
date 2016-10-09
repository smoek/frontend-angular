import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Group} from "./group";
import "rxjs/add/operator/toPromise";
import {Session} from "./Session";

@Injectable()
export class GroupsService {
    private groupsUrl = 'http://172.17.0.2/web/app_dev.php/group';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getGroups(): Promise<Group[]> {
        return this.http.get(this.groupsUrl)
            .toPromise()
            .then(response => response.json() as Group[])
            .catch(this.handleError);
    }

    getGroup(id: number): Promise<Group> {
        const url = `${this.groupsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Group)
            .catch(this.handleError);

    }

    update(group: Group): Promise<Group> {
        const url = `${this.groupsUrl}/${group.id}`;
        return this.http
            .put(url, JSON.stringify(group), {headers: this.headers})
            .toPromise()
            .then(() => group)
            .catch(this.handleError);
    }

    create(name: string): Promise<Group> {
        return this.http
            .post(this.groupsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.groupsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    join(group: Group, sessionName: string) {
        const data = {name: sessionName};
        const url = `${this.groupsUrl}/${group.id}/session`;
        return this.http
            .post(url, JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    leave(group: Group, session: Session) {
        const url = `${this.groupsUrl}/${group.id}/session/${session.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then()
            .catch(this.handleError);
    }
}