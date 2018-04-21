import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginSuccessComponent } from './login/login-success.component';
import { NotFoundComponent } from './not-found.component';
import { LoginFormComponent } from './login/login-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'home', component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'login', component: LoginComponent,
    children: [
      {path: '', component: LoginFormComponent},
      {path: 'success/:username', component: LoginSuccessComponent},
    ]
  },
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
