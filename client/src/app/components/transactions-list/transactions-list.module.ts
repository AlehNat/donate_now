import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list.component';
import { TransactionsFilterComponent } from './transactions-filter/transactions-filter.component';
import { TransactionsListItemComponent } from './transactions-list-item/transactions-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TransactionsListComponent,
    TransactionsListItemComponent,
  ],
  declarations: [
    TransactionsListComponent,
    TransactionsFilterComponent,
    TransactionsListItemComponent,
  ]
})
export class TransactionsListModule { }
