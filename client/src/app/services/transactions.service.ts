import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { TransactionModel } from './models/transaction.model';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operator/map';

@Injectable()
export class TransactionsService {

  public urlGet: string = '/transfers';
  public urlPost: string = '';

  private baseUrl: string = 'http://localhost:5000'; // @todo: to move to app constants

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  public getTransactions(username: string) {
    let url = `${this.baseUrl}${this.urlGet}`;
    let options = {
      params: {
        user_id: username
      }
    };

    return this.http.get(url, options)
      .map((data: Object[]) => data['result'].map(
        item => new TransactionModel(item)
      ));
  }

  public getCurrentUserTransactions() {
    let { username } = this.authService.getProfile();

    return this.getTransactions(username);
  }
}
