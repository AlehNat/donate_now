import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from '../services/login.service';
import { RouterModule } from '@angular/router';
import { LoginSuccessComponent } from './login-success.component';
import { LoginFormComponent } from './login-form.component';
import { LoginPromoComponent } from './login-promo.component';
import { SubheaderModule } from '../components/subheader/subheader.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SubheaderModule,
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
