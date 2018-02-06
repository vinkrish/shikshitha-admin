import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { CookieService }  from 'angular2-cookie/core';
import { FeeStudent }     from './fee-student';
import { GlobalConstant } from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FeeStudentService {
  private studentUrl = GlobalConstant.BASE_API_URL + 'sectionfee';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getStudents(id: number): Promise<FeeStudent[]> {
    let url = `${this.studentUrl}/section/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getStudent(sectionId: number, studentId: number) {
    return this.getStudents(sectionId)
      .then(students => students.find(student => student.id === studentId));
  }

  save(student: FeeStudent): Promise<FeeStudent> {
    if (student.id) {
      return this.put(student);
    }
    return this.post(student);
  }

  private post(student: FeeStudent): Promise<FeeStudent> {
    return this.http
      .post(this.studentUrl, JSON.stringify(student), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(student: FeeStudent) {
    let url = `${this.studentUrl}/${student.id}`;
    return this.http
      .put(url, JSON.stringify(student), { headers: this.headers })
      .toPromise()
      .then(() => student)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}