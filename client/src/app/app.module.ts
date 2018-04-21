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


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    MenuModule,
    WelcomeModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
