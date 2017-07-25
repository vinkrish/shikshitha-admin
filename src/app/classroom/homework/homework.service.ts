import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Homework }      from './homework';
import { GlobalConstant }from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeworkService {
  private homeworkUrl = GlobalConstant.BASE_API_URL + 'homework';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getHomeworks(sectionId: number, homeworkDate: Date): Promise<Homework[]> {
    let url = `${this.homeworkUrl}/section/${sectionId}/date/${homeworkDate}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  save(homework: Homework): Promise<Homework> {
    if (homework.id) {
      return this.put(homework);
    }
    return this.post(homework);
  }

  delete(homework: Homework) {
    let url = `${this.homeworkUrl}/${homework.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(homework: Homework): Promise<Homework> {
    return this.http
      .post(this.homeworkUrl, JSON.stringify(homework), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private put(homework: Homework) {
    let url = `${this.homeworkUrl}/${homework.id}`;
    return this.http
      .put(this.homeworkUrl, JSON.stringify(homework), { headers: this.headers })
      .toPromise()
      .then(() => homework)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}