import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { FeeTransaction }from './fee-transaction';
import { GlobalConstant }from '../../shared/global.const';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FeeTransactionService {
  private feeUrl = GlobalConstant.BASE_API_URL + 'studentfee';
  private headers;

  constructor(private http: Http, 
    private cookieService: CookieService) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Authorization', `Bearer ${this.cookieService.get("auth_token")}`);
  }

  getClasses(studentId: number): Promise<FeeTransaction[]> {
    //let url = `${this.feeUrl}/student/${+this.cookieService.get("studentId")}`;
    let url = `${this.feeUrl}/student/${studentId}`;
    return this.http
      .get(url, { headers: this.headers, body: '' })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getClass(studentId:number, id: number) {
    return this.getClasses(id)
      .then(classes => classes.find(feeTransaction => feeTransaction.id === id));
  }

  save(feeTransaction: FeeTransaction): Promise<FeeTransaction> {
    feeTransaction.studentId = +this.cookieService.get("studentId");
    return this.post(feeTransaction);
  }

  delete(feeTransaction: FeeTransaction) {
    let url = `${this.feeUrl}/${feeTransaction.id}`;
    return this.http
      .delete(url, { headers: this.headers, body: '' })
      .toPromise()
      .catch(this.handleError);
  }

  private post(feeTransaction: FeeTransaction): Promise<FeeTransaction> {
    feeTransaction.id = 0;
    return this.http
      .post(this.feeUrl, JSON.stringify(feeTransaction), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}