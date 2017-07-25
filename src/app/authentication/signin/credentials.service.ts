import { Injectable }               from '@angular/core';
import { Headers, Http, Response }  from '@angular/http';
import { Credentials }              from './credentials';
import { AuthResponse }             from './auth-response';
import { CookieService }            from 'angular2-cookie/core';
import { Observable }               from 'rxjs/Observable';
import { BehaviorSubject }          from 'rxjs/BehaviorSubject'
import { GlobalConstant }           from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  private loggedIn = false;
  private auth_response: AuthResponse;
  private loginUrl = GlobalConstant.BASE_API_URL + 'login';
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(
    private http: Http,
    private cookieService: CookieService) {
    this.isLoggedInSubject = new BehaviorSubject(this.checkIsLoggedIn());
  }

  get loggedInObservable() {
    return this.isLoggedInSubject.asObservable();
  }

  checkIsLoggedIn() {
    let isLoggedIn = false;
    isLoggedIn = (this.cookieService.get("isLoggedIn") === "true");
    return isLoggedIn;
  }

  private extractData(res: Response) {
    let body = res;
    if (res.status == 200) {
      var header = res.headers;
      this.auth_response = body.json();
      this.cookieService.put("schoolId", "" + this.auth_response.schoolId);
      this.cookieService.put("schoolName", this.auth_response.schoolName);
      this.cookieService.put("auth_token", this.auth_response.token);
      this.cookieService.put("isLoggedIn", "" + true);
      this.isLoggedInSubject.next(this.checkIsLoggedIn());
      return true;
    }
    return false;
  }

  post(credentials: Credentials): Promise<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.loginUrl, JSON.stringify(credentials), { headers: headers })
      .toPromise()
      .then(res => {
        if (res.status === 200) {
          this.auth_response = res.json();
          this.cookieService.put("schoolId", "" + this.auth_response.schoolId);
          this.cookieService.put("schoolName", this.auth_response.schoolName);
          this.cookieService.put("auth_token", this.auth_response.token);
          this.cookieService.put("isLoggedIn", "" + true);
          this.isLoggedInSubject.next(this.checkIsLoggedIn());
          return true;
        }
        return false;
      })
      .catch(this.handleError);
  }

  logout() {
    this.cookieService.put("isLoggedIn", "" + false);
    this.cookieService.put("auth_token", "");
    this.isLoggedInSubject.next(this.checkIsLoggedIn());
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.checkIsLoggedIn();
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}