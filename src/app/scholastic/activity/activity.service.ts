import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { Activity }           from './activity';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {
  private activityUrl = GlobalConstant.BASE_API_URL + 'activity';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getActivities(sectionId, examId, subjectId): Promise<Activity[]> {
    let url = `${this.activityUrl}/section/${sectionId}/exam/${examId}/subject/${subjectId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  save(activity: Activity): Promise<Activity> {
    if (activity.id) {
      return this.put(activity);
    }
    return this.post(activity);
  }

  delete(activity: Activity) {
    let url = `${this.activityUrl}/${activity.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  post(activity: Activity): Promise<Activity> {
    return this.http
      .post(this.activityUrl, JSON.stringify(activity), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  put(activity: Activity) {
    return this.http
      .put(this.activityUrl, JSON.stringify(activity), { headers: this.headers })
      .toPromise()
      .then(() => activity)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}