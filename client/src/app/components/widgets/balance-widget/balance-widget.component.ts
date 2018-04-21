import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.css'],
})
export class BalanceWidgetComponent implements OnInit {

  public balance: number = 235;
  public diff: number = 13;

  constructor() { }

  ngOnInit() {
  }

}
