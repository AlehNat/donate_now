import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { TransactionModel } from './models/transaction.model';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TransactionsService {

  public urlGet: string = '/transfers';
  public urlPost: string = '';

  public balance_sbd$: Subject<number> = new Subject();
  public diff$: Subject<number> = new Subject();

  private baseUrl: string = 'http://localhost:5000'; // @todo: to move to app constants

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  public getTransactions(username: string): Observable<TransactionModel[]> {
    let url = `${this.baseUrl}${this.urlGet}`;
    let options = {
      params: {
        user_id: username
      }
    };

    return this.http.get(url, options)
      .map((data: Object[]) => {
        let balance = +data['sbd_balance'].replace(' SBD', '');
        let transactions = data['result'].map(
          item => new TransactionModel(item)
        );
        let diff = transactions[0].amount_sbd;


        // @TODO: to refactor
        this.balance_sbd$.next(balance);
        this.diff$.next(diff);
        this.authService.getProfile().updateBalances(balance, diff);


        return transactions;
      });
  }

  public getCurrentUserTransactions(): Observable<TransactionModel[]> {
    let { username } = this.authService.getProfile();

    return this.getTransactions(username);
  }
}
