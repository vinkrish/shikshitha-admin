import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';
import { CookieService }    from 'angular2-cookie/core';
import { CceCoscholastic }  from './cce-coscholastic';
import { GlobalConstant }   from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CceCoscholasticService {
  private cceCoscholasticUrl = GlobalConstant.BASE_API_URL + 'ccecoscholastic';
  private headers;

  constructor(private http: Http, 
    private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getCceCoscholastics(): Promise<CceCoscholastic[]> {
    let url = `${this.cceCoscholasticUrl}/school/${+this.cookieService.get("schoolId")}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCceCoscholastic(id: number) {
    return this.getCceCoscholastics()
      .then(cceCoschs => cceCoschs.find(cceCosch => cceCosch.id === id));
  }

  save(cceCosch: CceCoscholastic): Promise<CceCoscholastic> {
    if (cceCosch.id) {
      return this.put(cceCosch);
    }
    return this.post(cceCosch);
  }

  delete(cceCosch: CceCoscholastic) {
    let url = `${this.cceCoscholasticUrl}/${cceCosch.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(cceCosch: CceCoscholastic): Promise<CceCoscholastic> {
    cceCosch.id = 0;
    cceCosch.schoolId = + this.cookieService.get("schoolId");
    return this.http
      .post(this.cceCoscholasticUrl, JSON.stringify(cceCosch), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(cceCosch: CceCoscholastic) {
    let url = `${this.cceCoscholasticUrl}/${cceCosch.id}`;
    return this.http
      .put(url, JSON.stringify(cceCosch), { headers: this.headers })
      .toPromise()
      .then(() => cceCosch)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}