import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import {CookieService}   from 'angular2-cookie/core';
import { SubjectGroup }  from './subject-group';
import { GlobalConstant }from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubjectGroupService {
  private subjectGroupUrl = GlobalConstant.BASE_API_URL + 'subjectgroup';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSubjectGroups(): Promise<SubjectGroup[]> {
    let url = `${this.subjectGroupUrl}/school/${+this.cookieService.get("schoolId")}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSubjectGroup(id: number) {
    return this.getSubjectGroups()
      .then(subjectGroups => subjectGroups.find(subjectGroup => subjectGroup.id === id));
  }

  save(subjectGroup: SubjectGroup): Promise<SubjectGroup> {
    if (subjectGroup.id) {
      return this.put(subjectGroup);
    }
    return this.post(subjectGroup);
  }

  delete(subjectGroup: SubjectGroup) {
    let url = `${this.subjectGroupUrl}/${subjectGroup.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(subjectGroup: SubjectGroup): Promise<SubjectGroup> {
    subjectGroup.schoolId = + this.cookieService.get("schoolId");
    return this.http
      .post(this.subjectGroupUrl, JSON.stringify(subjectGroup), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(subjectGroup: SubjectGroup) {
    let url = `${this.subjectGroupUrl}/${subjectGroup.id}`;
    return this.http
      .put(url, JSON.stringify(subjectGroup), { headers: this.headers })
      .toPromise()
      .then(() => subjectGroup)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}