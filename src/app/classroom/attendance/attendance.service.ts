import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Attendance }    from './attendance';
import { GlobalConstant }from '../../shared/global.const';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AttendanceService {
  private fileUrl = GlobalConstant.BASE_API_URL + 'excel';
  private attendanceUrl = GlobalConstant.BASE_API_URL + 'attendance';
  private dailyMarkedUrl = GlobalConstant.BASE_API_URL + 'attendance/daily/marked';
  private dailyUnmarkedUrl = GlobalConstant.BASE_API_URL + 'attendance/daily/unmarked';
  private sessionMarkedUrl = GlobalConstant.BASE_API_URL + 'attendance/session/marked';
  private sessionUnmarkedUrl = GlobalConstant.BASE_API_URL + 'attendance/session/unmarked';
  private headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  downloadAttendance(className: String, sectionName: String, sectionId: number, attendanceDate: Date): Observable<Blob> {
    let url = `${this.fileUrl}/${className}/${sectionName}/${sectionId}/att/${attendanceDate}`;
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http.get(url, options)
        .map(res => res.blob())
        .catch(this.handleError)
  }

  dailyAttendanceMarked(sectionId: number, dateAttendance: Date): Promise<Attendance[]> {
    let url = `${this.dailyMarkedUrl}/section/${sectionId}/date/${dateAttendance}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  dailyAttendanceUnmarked(sectionId: number, dateAttendance: Date): Promise<Attendance[]> {
    let url = `${this.dailyUnmarkedUrl}/section/${sectionId}/date/${dateAttendance}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  sessionAttendanceMarked(session: number, sectionId: number, dateAttendance: Date): Promise<Attendance[]> {
    let url = `${this.sessionMarkedUrl}/${session}/${sectionId}/${dateAttendance}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  sessionAttendanceUnmarked(session: number, sectionId: number, dateAttendance: Date): Promise<Attendance[]> {
    let url = `${this.sessionUnmarkedUrl}/${session}/${sectionId}/${dateAttendance}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(attendance: Attendance) {
    let url = `${this.attendanceUrl}/${attendance.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  deleteWhole(attendance: Attendance) {
    let url = `${this.attendanceUrl}/deleteWhole`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  post(attendance: Attendance[]) {
    let url = `${this.attendanceUrl}/list`;
    return this.http
      .post(url, JSON.stringify(attendance), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  noAbsentees(attendance: Attendance): Promise<Attendance> {
  	let url = `${this.attendanceUrl}/noAbsentees`;
    return this.http
      .post(url, JSON.stringify(attendance), { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private put(attendance: Attendance) {
    let url = `${this.attendanceUrl}/${attendance.id}`;
    return this.http
      .put(url, JSON.stringify(attendance), { headers: this.headers })
      .toPromise()
      .then(() => attendance)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}