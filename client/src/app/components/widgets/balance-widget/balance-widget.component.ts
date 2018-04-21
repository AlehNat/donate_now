import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.css'],
  host: {
    class: 'col-lg-12 px-0',
  }
})
export class BalanceWidgetComponent implements OnInit {

  public balance: number = 235;
  public diff: number = 13;

  constructor() { }

  ngOnInit() {
  }

}
