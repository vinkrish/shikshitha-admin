import { Injectable }            from '@angular/core';
import { Headers, Http }         from '@angular/http';
import { CookieService }         from 'angular2-cookie/core';
import { CceCoscholasticClass }  from './cce-coscholastic-class';
import { GlobalConstant }        from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CceCoschClassService {
  private cccUrl = GlobalConstant.BASE_API_URL + 'ccecoscholasticclass';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getCceCoschClasses(id: number): Promise<CceCoscholasticClass[]> {
    let url = `${this.cccUrl}/coscholastic/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCceCoschClass(id: number) {
    return this.getCceCoschClasses(id)
      .then(cceCoschClasses => cceCoschClasses.find(cceCoschClass => cceCoschClass.id === id));
  }

  save(cceCoschClass: CceCoscholasticClass): Promise<CceCoscholasticClass> {
    return this.post(cceCoschClass);
  }

  delete(cceCoschClass: CceCoscholasticClass) {
    let url = `${this.cccUrl}/${cceCoschClass.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(cceCoschClass: CceCoscholasticClass): Promise<CceCoscholasticClass> {
    return this.http
      .post(this.cccUrl, JSON.stringify(cceCoschClass), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}