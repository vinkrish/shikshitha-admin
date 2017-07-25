import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { CookieService }  from 'angular2-cookie/core';
import { Section }        from './section';
import { GlobalConstant } from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SectionService {
  private sectionUrl = GlobalConstant.BASE_API_URL + 'section';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getSections(id: number): Promise<Section[]> {
    let url = `${this.sectionUrl}/class/${id}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSection(classId: number, sectionId: number) {
    return this.getSections(classId)
      .then(sections => sections.find(section => section.id === sectionId));
  }

  save(section: Section): Promise<Section> {
    if (section.id) {
      return this.put(section);
    }
    return this.post(section);
  }

  delete(section: Section) {
    let url = `${this.sectionUrl}/${section.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(section: Section): Promise<Section> {
    return this.http
      .post(this.sectionUrl, JSON.stringify(section), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private put(section: Section) {
    let url = `${this.sectionUrl}/${section.id}`;
    return this.http
      .put(url, JSON.stringify(section), { headers: this.headers })
      .toPromise()
      .then(() => section)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}