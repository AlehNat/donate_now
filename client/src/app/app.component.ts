import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public userAuthorized: boolean = false;

  constructor(
    private authService: AuthService
  ) {
    this.subscribeToData();
  }

  getExtraClasses() {
    let cls = [];

    if (this.userAuthorized) {
      cls.push('mt-5');
    }

    return cls;
  }

  private subscribeToData() {
    this.authService.userLoggedIn$.subscribe((authorized) => this.userAuthorized = authorized);
  }
}
