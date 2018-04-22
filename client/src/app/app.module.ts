import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';
import { AuthService } from './services/auth.service';
import { WelcomeModule } from './welcome/welcome.module';
import { NotFoundComponent } from './not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './services/auth-guard.service';
import { LogoutModule } from './logout/logout.module';
import { TransactionsService } from './services/transactions.service';
import { HttpClientModule } from '@angular/common/http';
import { CampaignsModule } from './campaigns/campaigns.module';
import { CampaignsService } from './services/campaigns.service';
import { CampaignCreateModule } from './campaign-create/campaign-create.module';
import { MenuService } from './services/menu.service';
import { CampaignDetailsModule } from './campaign-details/campaign-details.module';
import { DonateService } from './services/donate.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    LogoutModule,
    HomeModule,
    MenuModule,
    WelcomeModule,
    DashboardModule,
    HttpClientModule,
    CampaignsModule,
    CampaignCreateModule,
    CampaignDetailsModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    TransactionsService,
    CampaignsService,
    MenuService,
    DonateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
