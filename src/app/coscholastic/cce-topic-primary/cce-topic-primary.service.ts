import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { CceTopicPrimary }    from './cce-topic-primary';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TopicPrimaryService {
  private topicPrimaryUrl = GlobalConstant.BASE_API_URL + 'ccetopicprimary';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getTopicPrimarys(id: number): Promise<CceTopicPrimary[]> {
    let url = `${this.topicPrimaryUrl}/sectionheading/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTopicPrimary(sectionHeadingId: number, topicPrimaryId: number) {
    return this.getTopicPrimarys(sectionHeadingId)
      .then(topicPrimarys => topicPrimarys.find(topicPrimary => topicPrimary.id === topicPrimaryId));
  }

  save(topicPrimary: CceTopicPrimary): Promise<CceTopicPrimary> {
    if (topicPrimary.id) {
      return this.put(topicPrimary);
    }
    return this.post(topicPrimary);
  }

  delete(topicPrimary: CceTopicPrimary) {
    let url = `${this.topicPrimaryUrl}/${topicPrimary.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(topicPrimary: CceTopicPrimary): Promise<CceTopicPrimary> {
    return this.http
      .post(this.topicPrimaryUrl, JSON.stringify(topicPrimary), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(topicPrimary: CceTopicPrimary) {
    let url = `${this.topicPrimaryUrl}/${topicPrimary.id}`;
    return this.http
      .put(url, JSON.stringify(topicPrimary), { headers: this.headers })
      .toPromise()
      .then(() => topicPrimary)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}