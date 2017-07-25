import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { ExamSubject }        from './exam-subject';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExamSubjectService {
  private examSubjectUrl = GlobalConstant.BASE_API_URL + 'examsubject';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getExamSubjects(id: number): Promise<ExamSubject[]> {
    let url = `${this.examSubjectUrl}/exam/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  save(examSubject: ExamSubject): Promise<ExamSubject> {
    if (examSubject.id) {
      return this.put(examSubject);
    }
    return this.post(examSubject);
  }

  delete(examSubject: ExamSubject) {
    let url = `${this.examSubjectUrl}/${examSubject.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  post(examSubject: ExamSubject): Promise<ExamSubject> {
    return this.http
      .post(this.examSubjectUrl, JSON.stringify(examSubject), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  put(examSubject: ExamSubject) {
    return this.http
      .put(this.examSubjectUrl, JSON.stringify(examSubject), { headers: this.headers })
      .toPromise()
      .then(() => examSubject)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}