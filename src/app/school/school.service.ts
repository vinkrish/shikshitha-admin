import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { CookieService }  from 'angular2-cookie/core';
import { School }         from './school';
import { Service }        from './service';
import { GlobalConstant } from '../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SchoolService {
  private schoolUrl = GlobalConstant.BASE_API_URL + 'school';
  private serviceUrl = GlobalConstant.BASE_API_URL + 'service';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSchools(superAdminPassword: string): Promise<School[]> {
    let url = `${this.schoolUrl}/admin/${superAdminPassword}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSchool(schoolId: number) {
    let url = `${this.schoolUrl}/${schoolId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getService(schoolId: number) {
    let url = `${this.serviceUrl}/school/${schoolId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public updateService(service: Service) {
    return this.http
      .put(this.serviceUrl, JSON.stringify(service), { headers: this.headers })
      .toPromise()
      .then(() => service)
      .catch(this.handleError);
  }

  save(school: School): Promise<School> {
    if (school.id) {
      return this.put(school);
    }
    return this.post(school);
  }

  delete(school: School) {
    let url = `${this.schoolUrl}/${school.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(school: School): Promise<School> {
    return this.http
      .post(this.schoolUrl, JSON.stringify(school), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(school: School) {
    let url = `${this.schoolUrl}/${school.id}`;
    return this.http
      .put(url, JSON.stringify(school), { headers: this.headers })
      .toPromise()
      .then(() => school)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}