import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { ClassSubjectGroup }  from './class-subject-group';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClassSubjectGroupService {
  private csgUrl = GlobalConstant.BASE_API_URL + 'classsubjectgroup';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getClassSubjectGroups(id: number): Promise<ClassSubjectGroup[]> {
    let url = `${this.csgUrl}/class/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getClassSubjectGroup(id: number) {
    return this.getClassSubjectGroups(id)
      .then(classSubjectGroups => classSubjectGroups.find(classSubjectGroup => classSubjectGroup.id === id));
  }

  save(classSubjectGroup: ClassSubjectGroup): Promise<ClassSubjectGroup> {
    if (classSubjectGroup.id) {
      return this.put(classSubjectGroup);
    }
    return this.post(classSubjectGroup);
  }

  delete(classSubjectGroup: ClassSubjectGroup) {
    let url = `${this.csgUrl}/${classSubjectGroup.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(classSubjectGroup: ClassSubjectGroup): Promise<ClassSubjectGroup> {
    return this.http
      .post(this.csgUrl, JSON.stringify(classSubjectGroup), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(classSubjectGroup: ClassSubjectGroup) {
    let url = `${this.csgUrl}/${classSubjectGroup.id}`;
    return this.http
      .put(url, JSON.stringify(classSubjectGroup), { headers: this.headers })
      .toPromise()
      .then(() => classSubjectGroup)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}