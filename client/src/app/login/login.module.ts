import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from '../services/login.service';
import { RouterModule } from '@angular/router';
import { LoginSuccessComponent } from './login-success.component';
import { LoginFormComponent } from './login-form.component';
import { LoginPromoComponent } from './login-promo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LoginComponent,
    LoginSuccessComponent,
    LoginFormComponent,
    LoginPromoComponent,
  ],
  providers: [
    LoginService,
  ]
})
export class LoginModule {
}
