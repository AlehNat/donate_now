import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginSuccessComponent } from './login/login-success.component';
import { NotFoundComponent } from './not-found.component';
import { LoginFormComponent } from './login/login-form.component';
import { LoginPromoComponent } from './login/login-promo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { CampaignsComponent } from './campaigns/campaigns.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'campaigns', component: CampaignsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login', component: LoginComponent,
    children: [
      {path: '', component: LoginFormComponent},
      {path: 'promo-code', component: LoginPromoComponent},
      {path: 'success/:username', component: LoginSuccessComponent},
    ]
  },
  {path: 'logout', component: LogoutComponent},
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
