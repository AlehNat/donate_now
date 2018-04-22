import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../services/models/user.model';

@Component({
  selector: 'balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.css'],
})
export class BalanceWidgetComponent implements OnInit {

  public profile: UserModel;

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
    this.profile = this.authService.getProfile();
    if ('balance' in this.profile) {
      this.balance = this.profile.balance;
    }

    if ('lastDiff' in this.profile) {
      this.diff = this.profile.lastDiff;
    }
  }
}
