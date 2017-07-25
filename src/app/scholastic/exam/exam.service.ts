import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { Exam }               from './exam';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ExamService {
  private examUrl = GlobalConstant.BASE_API_URL + 'exam';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getExams(id: number): Promise<Exam[]> {
    let url = `${this.examUrl}/class/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getExam(classId: number, examId: number) {
    return this.getExams(classId)
      .then(exams => exams.find(exam => exam.id === examId));
  }

  save(exam: Exam): Promise<Exam> {
    if (exam.id) {
      return this.put(exam);
    }
    return this.post(exam);
  }

  delete(exam: Exam) {
    let url = `${this.examUrl}/${exam.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(exam: Exam): Promise<Exam> {
    return this.http
      .post(this.examUrl, JSON.stringify(exam), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(exam: Exam) {
    let url = `${this.examUrl}/${exam.id}`;
    return this.http
      .put(url, JSON.stringify(exam), { headers: this.headers })
      .toPromise()
      .then(() => exam)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}