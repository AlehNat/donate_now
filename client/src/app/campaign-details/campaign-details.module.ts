import { NgModule } from '@angular/core';

import { CampaignDetailsComponent } from './campaign-details.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignsListModule } from '../components/campaigns-list/campaigns-list.module';
import { SubheaderModule } from '../components/subheader/subheader.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CampaignsListModule,
    SubheaderModule,
  ],
  exports: [],
  declarations: [
    CampaignDetailsComponent
  ],
  providers: [

  ],
})
export class CampaignDetailsModule {
}
