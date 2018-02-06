import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { FeeClass }      from './fee-class';
import { GlobalConstant }from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FeeClassService {
  private feeclassUrl = GlobalConstant.BASE_API_URL + 'classfee';
  private headers;

  constructor(private http: Http, 
    private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getClasses(): Promise<FeeClass[]> {
    let url = `${this.feeclassUrl}/school/${+this.cookieService.get("schoolId")}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getClass(id: number) {
    return this.getClasses()
      .then(classes => classes.find(clas => clas.id === id));
  }

  save(clas: FeeClass): Promise<FeeClass> {
    if (clas.id) {
      return this.put(clas);
    }
    return this.post(clas);
  }

  private post(clas: FeeClass): Promise<FeeClass> {
    clas.id = 0;
    clas.schoolId = + this.cookieService.get("schoolId");
    return this.http
      .post(this.feeclassUrl, JSON.stringify(clas), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(clas: FeeClass) {
    let url = `${this.feeclassUrl}/${clas.id}`;
    return this.http
      .put(url, JSON.stringify(clas), { headers: this.headers })
      .toPromise()
      .then(() => clas)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}