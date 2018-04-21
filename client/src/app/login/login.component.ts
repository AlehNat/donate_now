import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public msg: string;

  constructor(
    // private loginService: LoginService,
  ) {
    // this.loginService.helloWorld().subscribe((msg) => this.msg = msg);
  }

  ngOnInit() {

  }

}
