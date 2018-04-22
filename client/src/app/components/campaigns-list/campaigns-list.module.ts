import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsListComponent } from './campaigns-list.component';
import { CampaignsListItemComponent } from './campaigns-list-item/campaigns-list-item.component';
import { TransactionsListModule } from '../transactions-list/transactions-list.module';
import { DonateButtonModule } from '../donate-button/donate-button.module';

@NgModule({
  imports: [
    CommonModule,
    TransactionsListModule,
    DonateButtonModule,
  ],
  declarations: [
    CampaignsListComponent,
    CampaignsListItemComponent,
  ],
  exports: [
    CampaignsListComponent,
    CampaignsListItemComponent,
  ]
})
export class CampaignsListModule {
}
