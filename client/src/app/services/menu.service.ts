import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './auth.service';

@Injectable()
export class MenuService {

  public menuVisible$: Subject<boolean> = new Subject();

  constructor(
    private authService: AuthService
  ) {

    this.checkUserAuth();
  }

  showMenu() {
    this.menuVisible$.next(true);
  }

  hideMenu() {
    this.menuVisible$.next(false);
  }

  private checkUserAuth() {
    this.authService.userLoggedIn$.subscribe( loggedIn => this.menuVisible$.next(loggedIn) );
  }
}
