import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserModel } from './models/user.model';
import { Subject } from 'rxjs/Subject';

/**
 * Very simple auth service for demo purposes
 */
@Injectable()
export class AuthService {

  public profile: UserModel;

  public userLoggedIn$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
  ) {

  }

  authorizeUser(userdata: User) {
    this.profile = new UserModel(userdata);
    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.userLoggedIn$.next(true);
  }

  logout(): Promise<boolean> {
    localStorage.removeItem('profile');
    this.userLoggedIn$.next(false);
    return this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    let profile = this.getProfile();
    return !!profile;
  }

  getProfile(): UserModel {
    if (!this.profile) {
      let data: Object = JSON.parse(localStorage.getItem('profile'));
      if (data && data.hasOwnProperty('username')) {
        this.profile = new UserModel(data);
      }
    }

    // @TODO: to refactor
    let loggedIn = !!this.profile;
    this.userLoggedIn$.next(loggedIn);

    if (this.profile && !(this.profile instanceof UserModel)) {
      this.profile = new UserModel(this.profile);
    }

    return this.profile;
  }
}
