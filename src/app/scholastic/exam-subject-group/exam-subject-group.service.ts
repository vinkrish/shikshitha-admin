import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { ExamSubjectGroup }   from './exam-subject-group';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExamSubjectGroupService {
  private esgUrl = GlobalConstant.BASE_API_URL + 'examsubjectgroup';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getExamSubjectGroups(id: number): Promise<ExamSubjectGroup[]> {
    let url = `${this.esgUrl}/exam/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(esg: ExamSubjectGroup) {
    let url = `${this.esgUrl}/${esg.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  post(esg: ExamSubjectGroup): Promise<ExamSubjectGroup> {
    return this.http
      .post(this.esgUrl, JSON.stringify(esg), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}