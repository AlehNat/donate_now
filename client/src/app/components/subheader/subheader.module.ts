import { NgModule } from '@angular/core';

import { SubheaderComponent } from './subheader.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    SubheaderComponent,
  ],
  declarations: [
    SubheaderComponent,
  ],
  providers: [],
})
export class SubheaderModule {
}
