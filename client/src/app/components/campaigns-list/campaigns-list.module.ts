import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsListComponent } from './campaigns-list.component';
import { CampaignsListItemComponent } from './campaigns-list-item/campaigns-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CampaignsListComponent,
    CampaignsListItemComponent,
  ],
  exports: [
    CampaignsListComponent,
  ]
})
export class CampaignsListModule {
}
