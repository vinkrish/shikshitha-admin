import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { CookieService }  from 'angular2-cookie/core';
import { Sliptest }       from './sliptest';
import { GlobalConstant } from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SliptestService {
  private sliptestUrl = GlobalConstant.BASE_API_URL + 'sliptest';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSliptests(sectionId, subjectId): Promise<Sliptest[]> {
    let url = `${this.sliptestUrl}/section/${sectionId}/subject/${subjectId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSliptest(sectionId, subjectId, sliptestId) {
    return this.getSliptests(sectionId, subjectId)
      .then(sliptests => sliptests.find(portion => portion.id === sliptestId));
  }

  save(sliptest: Sliptest): Promise<Sliptest> {
    if (sliptest.id) {
      return this.put(sliptest);
    }
    return this.post(sliptest);
  }

  delete(sliptest: Sliptest) {
    let url = `${this.sliptestUrl}/${sliptest.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(sliptest: Sliptest): Promise<Sliptest> {
    return this.http
      .post(this.sliptestUrl, JSON.stringify(sliptest), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(sliptest: Sliptest) {
    let url = `${this.sliptestUrl}/${sliptest.id}`;
    return this.http
      .put(url, JSON.stringify(sliptest), { headers: this.headers })
      .toPromise()
      .then(() => sliptest)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}