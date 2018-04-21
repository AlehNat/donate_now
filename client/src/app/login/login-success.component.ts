import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent implements OnInit {

  public username: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.username = route.snapshot.params.username;
  }

  ngOnInit() {
  }

}
