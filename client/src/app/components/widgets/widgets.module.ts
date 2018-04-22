import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceWidgetComponent } from './balance-widget/balance-widget.component';
import { ProfileWidgetComponent } from './profile-widget/profile-widget.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BalanceWidgetComponent,
    ProfileWidgetComponent,
  ],
  declarations: [
    BalanceWidgetComponent,
    ProfileWidgetComponent,
  ]
})
export class WidgetsModule {
}
