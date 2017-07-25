import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { Subjects }       from './subjects';
import { CookieService }  from 'angular2-cookie/core';
import { GlobalConstant } from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubjectsService {
  private subjectUrl = GlobalConstant.BASE_API_URL + 'subject';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSubjects(): Promise<Subjects[]> {
    let url = `${this.subjectUrl}/school/${+this.cookieService.get("schoolId")}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getClassSubjects(id: number): Promise<Subjects[]> {
    let url = `${this.subjectUrl}/class/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPartitionSubjects(id: number): Promise<Subjects[]> {
    let url = `${this.subjectUrl}/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSubject(id: number) {
    return this.getSubjects()
      .then(subjects => subjects.find(subject => subject.id === id));
  }

  save(subject: Subjects): Promise<Subjects> {
    if (subject.id) {
      return this.put(subject);
    }
    return this.post(subject);
  }

  delete(subject: Subjects) {
    let url = `${this.subjectUrl}/${subject.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(subject: Subjects): Promise<Subjects> {
    subject.schoolId = + this.cookieService.get("schoolId");
    return this.http
      .post(this.subjectUrl, JSON.stringify(subject), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(subject: Subjects) {
    let url = `${this.subjectUrl}/${subject.id}`;
    return this.http
      .put(url, JSON.stringify(subject), { headers: this.headers })
      .toPromise()
      .then(() => subject)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}