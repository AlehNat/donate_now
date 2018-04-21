import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    MenuModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
