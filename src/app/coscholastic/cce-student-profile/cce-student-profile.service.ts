import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { CceStudentProfile }	from './cce-student-profile';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CceStudentProfileService {
  private cceStudProfUrl = GlobalConstant.BASE_API_URL + 'ccestudentprofile';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getCceProfiles(sectionId, term): Promise<CceStudentProfile[]> {
    let url = `${this.cceStudProfUrl}/section/${sectionId}/term/${term}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  post(cceProfiles: CceStudentProfile[]) {
    return this.http
      .post(this.cceStudProfUrl, JSON.stringify(cceProfiles), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  put(cceProfiles: CceStudentProfile[]) {
    return this.http
      .put(this.cceStudProfUrl, JSON.stringify(cceProfiles), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  delete(sectionId, term) {
    let url = `${this.cceStudProfUrl}/section/${sectionId}/term/${term}`;
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