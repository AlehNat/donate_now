import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from '../services/login.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService,
  ]
})
export class LoginModule {
}
