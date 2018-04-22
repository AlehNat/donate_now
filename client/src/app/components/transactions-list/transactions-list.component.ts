import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionModel } from '../../services/models/transaction.model';
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

  }
}
