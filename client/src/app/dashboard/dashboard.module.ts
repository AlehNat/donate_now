import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SubheaderModule } from '../components/subheader/subheader.module';
import { WidgetsModule } from '../components/widgets/widgets.module';
import { TransactionsListModule } from '../components/transactions-list/transactions-list.module';

@NgModule({
  imports: [
    CommonModule,
    SubheaderModule,
    WidgetsModule,
    TransactionsListModule,
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class DashboardModule {
}
