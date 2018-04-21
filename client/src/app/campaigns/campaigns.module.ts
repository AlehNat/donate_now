import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './campaigns.component';
import { SubheaderModule } from '../components/subheader/subheader.module';
import { CampaignsListModule } from '../components/campaigns-list/campaigns-list.module';

@NgModule({
  imports: [
    CommonModule,
    SubheaderModule,
    CampaignsListModule,
  ],
  declarations: [
    CampaignsComponent
  ]
})
export class CampaignsModule { }
