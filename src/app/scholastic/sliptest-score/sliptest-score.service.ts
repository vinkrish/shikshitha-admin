import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { SliptestScore }	    from './sliptest-score';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SliptestScoreService {
  private scoreUrl = GlobalConstant.BASE_API_URL + 'sliptestscore';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getMarks(sliptestId): Promise<SliptestScore[]> {
    let url = `${this.scoreUrl}/sliptest/${sliptestId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  post(marks: SliptestScore[]) {
    return this.http
      .post(this.scoreUrl, JSON.stringify(marks), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  put(marks: SliptestScore[]) {
    return this.http
      .put(this.scoreUrl, JSON.stringify(marks), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  delete(sliptestId) {
    let url = `${this.scoreUrl}/sliptest/${sliptestId}`;
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