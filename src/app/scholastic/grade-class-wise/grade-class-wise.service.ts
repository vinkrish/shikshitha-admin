import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { GradeClassWise }     from './grade-class-wise';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GradeClassWiseService {
  private gcwUrl = GlobalConstant.BASE_API_URL + 'gradeclasswise';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getGradesClassWise(id: number): Promise<GradeClassWise[]> {
    let url = `${this.gcwUrl}/class/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  save(gcw: GradeClassWise): Promise<GradeClassWise> {
    if (gcw.id) {
      return this.put(gcw);
    }
    return this.post(gcw);
  }

  delete(gcw: GradeClassWise) {
    let url = `${this.gcwUrl}/${gcw.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  post(gcw: GradeClassWise): Promise<GradeClassWise> {
    return this.http
      .post(this.gcwUrl, JSON.stringify(gcw), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  put(gcw: GradeClassWise) {
    return this.http
      .put(this.gcwUrl, JSON.stringify(gcw), { headers: this.headers })
      .toPromise()
      .then(() => gcw)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}