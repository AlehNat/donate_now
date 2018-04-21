import { Component, Input, OnInit } from '@angular/core';
import { TransactionModel } from '../../../services/models/transaction.model';

@Component({
  selector: 'transactions-list-item',
  templateUrl: './transactions-list-item.component.html',
  styleUrls: [
    './transactions-list-item.component.css',
  ]
})
export class TransactionsListItemComponent implements OnInit {

  @Input()
  public transaction: TransactionModel;

  constructor() {
  }

  ngOnInit() {
  }

}
