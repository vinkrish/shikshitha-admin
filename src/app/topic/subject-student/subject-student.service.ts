import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { SubjectStudents }	  from './subject-students';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubjectStudentService {
  private subjectStudentUrl = GlobalConstant.BASE_API_URL + 'subjectstudent';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSubjectStudent(sectionId, subjectId): Promise<SubjectStudents> {
    let url = `${this.subjectStudentUrl}/section/${sectionId}/subject/${subjectId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSubjectStudents(sectionId, subjectGroupId): Promise<SubjectStudents[]> {
    let url = `${this.subjectStudentUrl}/section/${sectionId}/subjectGroup/${subjectGroupId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  post(subjectStudents: SubjectStudents[]) {
    let url = `${this.subjectStudentUrl}/recent`;
    return this.http
      .post(url, JSON.stringify(subjectStudents), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  put(subjectStudents: SubjectStudents[]) {
    return this.http
      .put(this.subjectStudentUrl, JSON.stringify(subjectStudents), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}