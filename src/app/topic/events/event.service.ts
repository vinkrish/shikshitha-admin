import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { Event }      	  from './event';
import { CookieService }  from 'angular2-cookie/core';
import { GlobalConstant } from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
  private eventUrl = GlobalConstant.BASE_API_URL + 'event';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getEvents(): Promise<Event[]> {
    let url = `${this.eventUrl}/school/${+this.cookieService.get("schoolId")}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSubject(id: number) {
    return this.getEvents()
      .then(subjects => subjects.find(subject => subject.id === id));
  }

  save(event: Event): Promise<Event> {
    if (event.id) {
      return this.put(event);
    }
    return this.post(event);
  }

  delete(event: Event) {
    let url = `${this.eventUrl}/${event.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(event: Event): Promise<Event> {
    event.schoolId = + this.cookieService.get("schoolId");
    return this.http
      .post(this.eventUrl, JSON.stringify(event), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(event: Event) {
    let url = `${this.eventUrl}/${event.id}`;
    return this.http
      .put(this.eventUrl, JSON.stringify(event), { headers: this.headers })
      .toPromise()
      .then(() => event)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}