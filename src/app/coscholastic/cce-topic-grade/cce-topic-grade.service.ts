import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { CceTopicGrade }      from './cce-topic-grade';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TopicGradeService {
  private topicGradeUrl = GlobalConstant.BASE_API_URL + 'ccetopicgrade';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getTopicGrades(id: number): Promise<CceTopicGrade[]> {
    let url = `${this.topicGradeUrl}/topicprimary/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTopicGrade(topicPrimaryId: number, topicGradeId: number) {
    return this.getTopicGrades(topicPrimaryId)
      .then(aspectPrimarys => aspectPrimarys.find(topicGrade => topicGrade.id === topicGradeId));
  }

  save(topicGrade: CceTopicGrade): Promise<CceTopicGrade> {
    if (topicGrade.id) {
      return this.put(topicGrade);
    }
    return this.post(topicGrade);
  }

  delete(topicGrade: CceTopicGrade) {
    let url = `${this.topicGradeUrl}/${topicGrade.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(topicGrade: CceTopicGrade): Promise<CceTopicGrade> {
    return this.http
      .post(this.topicGradeUrl, JSON.stringify(topicGrade), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(topicGrade: CceTopicGrade) {
    let url = `${this.topicGradeUrl}/${topicGrade.id}`;
    return this.http
      .put(url, JSON.stringify(topicGrade), { headers: this.headers })
      .toPromise()
      .then(() => topicGrade)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}