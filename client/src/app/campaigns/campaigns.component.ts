import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  public username;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.fetchRouteParams();
  }

  private fetchRouteParams() {
    this.username = this.route.firstChild.snapshot.params.username;

    if (!this.username) {
      this.username = this.authService.getProfile().username;
    }
  }
}
