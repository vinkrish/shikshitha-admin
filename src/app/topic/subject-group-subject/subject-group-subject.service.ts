import { Injectable }           from '@angular/core';
import { Headers, Http }        from '@angular/http';
import { CookieService }        from 'angular2-cookie/core';
import { SubjectGroupSubject }  from './subject-group-subject';
import { GlobalConstant }       from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubjectGroupSubjectService {
  private sgsUrl = GlobalConstant.BASE_API_URL + 'subjectgroupsubject';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSubjectGroupSubjects(id: number): Promise<SubjectGroupSubject[]> {
    let url = `${this.sgsUrl}/subjectgroup/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSubjectGroupSubject(id: number) {
    return this.getSubjectGroupSubjects(id)
      .then(subjectGroupSubjects => subjectGroupSubjects.find(subjectGroupSubject => subjectGroupSubject.id === id));
  }

  save(subjectGroupSubject: SubjectGroupSubject): Promise<SubjectGroupSubject> {
    if (subjectGroupSubject.id) {
      return this.put(subjectGroupSubject);
    }
    return this.post(subjectGroupSubject);
  }

  delete(subjectGroupSubject: SubjectGroupSubject) {
    let url = `${this.sgsUrl}/${subjectGroupSubject.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(subjectGroupSubject: SubjectGroupSubject): Promise<SubjectGroupSubject> {
    return this.http
      .post(this.sgsUrl, JSON.stringify(subjectGroupSubject), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(subjectGroupSubject: SubjectGroupSubject) {
    let url = `${this.sgsUrl}/${subjectGroupSubject.id}`;
    return this.http
      .put(url, JSON.stringify(subjectGroupSubject), { headers: this.headers })
      .toPromise()
      .then(() => subjectGroupSubject)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}