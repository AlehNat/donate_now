import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignCreateComponent } from './campaign-create.component';
import { SubheaderModule } from '../components/subheader/subheader.module';

@NgModule({
  imports: [
    CommonModule,
    SubheaderModule,
  ],
  declarations: [CampaignCreateComponent]
})
export class CampaignCreateModule { }
