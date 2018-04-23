import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'transactions-filter',
  templateUrl: './transactions-filter.component.html',
  styleUrls: ['./transactions-filter.component.scss']
})
export class TransactionsFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleAll($event) {
    $event.preventDefault()
  }

  toggleIncome($event) {
    $event.preventDefault()
  }

  toggleOutcome($event) {
    $event.preventDefault()
  }
}
