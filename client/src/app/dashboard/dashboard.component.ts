import { Component, OnInit } from '@angular/core';
import { UserModel } from '../services/models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class: 'row'
  }
})
export class DashboardComponent implements OnInit {

  public profile: UserModel;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {

    this.profile = this.authService.getProfile();
  }


}
