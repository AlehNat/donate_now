import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
  ) {

  }

  login() {

  }

  logout() {
    localStorage.removeItem('profile');
    this.router.navigate(['/welcome']);
  }


  verifySteemConnectLogin() {

  }

  isLoggedIn() {
    return typeof localStorage.getItem('profile') !== 'undefined';
  }

  getProfile() {
    return localStorage.getItem('profile');
  }
}
