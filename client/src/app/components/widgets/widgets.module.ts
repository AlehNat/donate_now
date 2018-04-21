import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceWidgetComponent } from './balance-widget/balance-widget.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BalanceWidgetComponent,
  ],
  declarations: [
    BalanceWidgetComponent
  ]
})
export class WidgetsModule {
}
