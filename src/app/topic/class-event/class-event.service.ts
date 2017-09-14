import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { ClassEvent }         from './class-event';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClassEventService {
  private ceUrl = GlobalConstant.BASE_API_URL + 'classevent';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getClassEvents(id: number): Promise<ClassEvent[]> {
    let url = `${this.ceUrl}/event/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getClassEvent(id: number) {
    return this.getClassEvents(id)
      .then(classEvents => classEvents.find(classEvent => classEvent.id === id));
  }

  save(classEvent: ClassEvent): Promise<ClassEvent> {
    if (classEvent.id) {
      return this.put(classEvent);
    }
    return this.post(classEvent);
  }

  delete(classEvent: ClassEvent) {
    let url = `${this.ceUrl}/${classEvent.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(classEvent: ClassEvent): Promise<ClassEvent> {
    return this.http
      .post(this.ceUrl, JSON.stringify(classEvent), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(classEvent: ClassEvent) {
    let url = `${this.ceUrl}/${classEvent.id}`;
    return this.http
      .put(url, JSON.stringify(classEvent), { headers: this.headers })
      .toPromise()
      .then(() => classEvent)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}