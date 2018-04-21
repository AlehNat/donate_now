import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserModel } from './models/user.model';

/**
 * Very simple auth service for demo purposes
 */
@Injectable()
export class AuthService {

  public profile: UserModel;

  constructor(
    private router: Router,
  ) {

  }

  authorizeUser(userdata: User) {
    this.profile = new UserModel(userdata);
    localStorage.setItem('profile', JSON.stringify(this.profile));
  }

  logout(): Promise<boolean> {
    localStorage.removeItem('profile');
    return this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    let profile = this.getProfile();
    console.log('profile', profile);
    return !!profile;
  }

  getProfile(): UserModel {
    if (!this.profile) {
      let data = localStorage.getItem('profile');
      this.profile = JSON.parse(data);
    }

    return this.profile;
  }
}
