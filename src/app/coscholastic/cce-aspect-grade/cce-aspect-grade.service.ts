import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { CceAspectGrade }     from './cce-aspect-grade';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AspectGradeService {
  private aspectGradeUrl = GlobalConstant.BASE_API_URL + 'cceaspectgrade';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getGrades(aspectId, sectionId, term): Promise<CceAspectGrade[]> {
    let url = `${this.aspectGradeUrl}/aspect/${aspectId}/section/${sectionId}/term/${term}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  post(grades: CceAspectGrade[]) {
    return this.http
      .post(this.aspectGradeUrl, JSON.stringify(grades), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  put(grades: CceAspectGrade[]) {
    return this.http
      .put(this.aspectGradeUrl, JSON.stringify(grades), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  delete(aspectId, sectionId, term) {
    let url = `${this.aspectGradeUrl}/aspect/${aspectId}/section/${sectionId}/term/${term}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}