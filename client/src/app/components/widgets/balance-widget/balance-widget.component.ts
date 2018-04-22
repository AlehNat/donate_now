import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';

@Component({
  selector: 'balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.css'],
})
export class BalanceWidgetComponent implements OnInit {

  public balance: number = 0;
  public diff: number = 0;

  constructor(
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit() {

    this.subscribeToBalance();
  }

  private subscribeToBalance() {
    this.transactionsService.balance$.subscribe( balance => this.balance = balance );
    this.transactionsService.diff$.subscribe( diff => this.diff = diff );
  }
}
