import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.css'],
})
export class BalanceWidgetComponent implements OnInit {

  public balance: number;
  public diff: number;

  constructor(
    private transactionsService: TransactionsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initProfileBalance();
    this.subscribeToBalanceChanges();
  }

  private subscribeToBalanceChanges() {
    this.transactionsService.balance_sbd$.subscribe(balance => this.balance = balance );
    this.transactionsService.diff$.subscribe( diff => this.diff = diff );
  }

  private initProfileBalance() {
    let profile = this.authService.getProfile();
    if ('balance' in profile) {
      this.balance = profile.balance;
    }

    if ('lastDiff' in profile) {
      this.diff = profile.lastDiff;
    }
  }
}
