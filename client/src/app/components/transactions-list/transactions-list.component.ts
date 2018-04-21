import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction, TransactionModel } from '../../services/models/transaction.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {

  public transactions: TransactionModel[];

  constructor(
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit() {
    this.subscribeToData();
  }

  private subscribeToData() {
    this.transactionsService.getCurrentUserTransactions().subscribe(
      (items: TransactionModel[]) => this.transactions = items
    );

    // let stub = [
    //   new TransactionModel({amount_sbd: 0.41122, amount_steem: 0, comment: 'hey! thanks!', timestamp: ''}),
    //   new TransactionModel({amount_sbd: -1.414, amount_steem: 0, comment: 'Nice to meet you ^_^', timestamp: ''}),
    //   new TransactionModel({amount_sbd: 48.13123, amount_steem: 0, comment: 'Great service!', timestamp: ''}),
    //   new TransactionModel({amount_sbd: -14, amount_steem: 0, comment: 'wow nice', timestamp: ''}),
    // ];
    // Observable.of(stub).subscribe(
    //   (data) => this.transactions = data
    // );
  }
}
