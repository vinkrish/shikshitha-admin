import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { CookieService }  from 'angular2-cookie/core';
import { Portion }        from './portion';
import { GlobalConstant } from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PortionService {
  private portionUrl = GlobalConstant.BASE_API_URL + 'portion';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getPortions(classId, subjectId): Promise<Portion[]> {
    let url = `${this.portionUrl}/class/${classId}/subject/${subjectId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPortion(classId, subjectId, portionId) {
    return this.getPortions(classId, subjectId)
      .then(portions => portions.find(portion => portion.id === portionId));
  }

  save(portion: Portion): Promise<Portion> {
    if (portion.id) {
      return this.put(portion);
    }
    return this.post(portion);
  }

  delete(portion: Portion) {
    let url = `${this.portionUrl}/${portion.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(portion: Portion): Promise<Portion> {
    return this.http
      .post(this.portionUrl, JSON.stringify(portion), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(portion: Portion) {
    let url = `${this.portionUrl}/${portion.id}`;
    return this.http
      .put(url, JSON.stringify(portion), { headers: this.headers })
      .toPromise()
      .then(() => portion)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}