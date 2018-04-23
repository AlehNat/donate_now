import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DOCUMENT } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {

  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.document.location.href = 'http://localhost:5000/login';
  }

  signup() {
    this.document.location.href = 'https://signup.steemit.com/?ref=donatenow';
  }

  usePromo() {
    this.router.navigate(['/login/promo-code']);
  }
}

