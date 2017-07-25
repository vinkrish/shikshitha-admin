import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { CceAspectPrimary }   from './cce-aspect-primary';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AspectPrimaryService {
  private aspectPrimaryUrl = GlobalConstant.BASE_API_URL + 'cceaspectprimary';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getAspectPrimarys(id: number): Promise<CceAspectPrimary[]> {
    let url = `${this.aspectPrimaryUrl}/topicprimary/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTopicPrimary(topicPrimaryId: number, aspectPrimaryId: number) {
    return this.getAspectPrimarys(topicPrimaryId)
      .then(aspectPrimarys => aspectPrimarys.find(aspectPrimary => aspectPrimary.id === aspectPrimaryId));
  }

  save(aspectPrimary: CceAspectPrimary): Promise<CceAspectPrimary> {
    if (aspectPrimary.id) {
      return this.put(aspectPrimary);
    }
    return this.post(aspectPrimary);
  }

  delete(aspectPrimary: CceAspectPrimary) {
    let url = `${this.aspectPrimaryUrl}/${aspectPrimary.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(aspectPrimary: CceAspectPrimary): Promise<CceAspectPrimary> {
    return this.http
      .post(this.aspectPrimaryUrl, JSON.stringify(aspectPrimary), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(aspectPrimary: CceAspectPrimary) {
    let url = `${this.aspectPrimaryUrl}/${aspectPrimary.id}`;
    return this.http
      .put(url, JSON.stringify(aspectPrimary), { headers: this.headers })
      .toPromise()
      .then(() => aspectPrimary)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}