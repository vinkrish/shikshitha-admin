import { Injectable }         from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { CookieService }      from 'angular2-cookie/core';
import { CceSectionHeading }  from './cce-section-heading';
import { GlobalConstant }     from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SectionHeadingService {
  private sectionHeadingUrl = GlobalConstant.BASE_API_URL + 'ccesectionheading';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSectionHeadings(id: number): Promise<CceSectionHeading[]> {
    let url = `${this.sectionHeadingUrl}/coscholastic/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSectionHeading(coscholasticId: number, sectionHeadingId: number) {
    return this.getSectionHeadings(coscholasticId)
      .then(sectionHeadings => sectionHeadings.find(sectionHeading => sectionHeading.id === sectionHeadingId));
  }

  save(sectionHeading: CceSectionHeading): Promise<CceSectionHeading> {
    if (sectionHeading.id) {
      return this.put(sectionHeading);
    }
    return this.post(sectionHeading);
  }

  delete(sectionHeading: CceSectionHeading) {
    let url = `${this.sectionHeadingUrl}/${sectionHeading.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(sectionHeading: CceSectionHeading): Promise<CceSectionHeading> {
    return this.http
      .post(this.sectionHeadingUrl, JSON.stringify(sectionHeading), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(sectionHeading: CceSectionHeading) {
    let url = `${this.sectionHeadingUrl}/${sectionHeading.id}`;
    return this.http
      .put(url, JSON.stringify(sectionHeading), { headers: this.headers })
      .toPromise()
      .then(() => sectionHeading)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}