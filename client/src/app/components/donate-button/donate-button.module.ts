import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateButtonComponent } from './donate-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DonateButtonComponent,
  ],
  exports: [
    DonateButtonComponent,
  ],
})
export class DonateButtonModule {
}
