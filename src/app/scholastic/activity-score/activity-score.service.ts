import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { ActivityScore }	    from './activity-score';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityScoreService {
  private scoreUrl = GlobalConstant.BASE_API_URL + 'activityscore';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getScore(activityId): Promise<ActivityScore[]> {
    let url = `${this.scoreUrl}/activity/${activityId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  post(scores: ActivityScore[]) {
    return this.http
      .post(this.scoreUrl, JSON.stringify(scores), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  put(scores: ActivityScore[]) {
    return this.http
      .put(this.scoreUrl, JSON.stringify(scores), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  delete(activityId) {
    let url = `${this.scoreUrl}/activity/${activityId}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}