import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Timetable }     from './timetable';
import { GlobalConstant }from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TimetableService {
  private timetableUrl = GlobalConstant.BASE_API_URL + 'timetable';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getTimetables(id: number): Promise<Timetable[]> {
    let url = `${this.timetableUrl}/section/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  save(timetable: Timetable): Promise<Timetable> {
    if (timetable.id) {
      return this.put(timetable);
    }
    return this.post(timetable);
  }

  delete(timetable: Timetable) {
    let url = `${this.timetableUrl}/${timetable.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(timetable: Timetable): Promise<Timetable> {
    return this.http
      .post(this.timetableUrl, JSON.stringify(timetable), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(timetable: Timetable) {
    let url = `${this.timetableUrl}/${timetable.id}`;
    return this.http
      .put(url, JSON.stringify(timetable), { headers: this.headers })
      .toPromise()
      .then(() => timetable)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}