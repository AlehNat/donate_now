import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignCreateComponent } from './campaign-create.component';
import { SubheaderModule } from '../components/subheader/subheader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SubheaderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CampaignCreateComponent
  ]
})
export class CampaignCreateModule { }
