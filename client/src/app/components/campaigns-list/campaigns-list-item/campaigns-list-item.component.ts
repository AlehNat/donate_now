import { Component, Input, OnInit } from '@angular/core';
import { CampaignModel } from '../../../services/models/campaign.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'campaigns-list-item',
  templateUrl: './campaigns-list-item.component.html',
  styleUrls: ['./campaigns-list-item.component.css']
})
export class CampaignsListItemComponent implements OnInit {

  @Input() public campaign: CampaignModel;
  @Input() public clickable: boolean = false;
  @Input() public details: boolean = false;

  public donateAllowed: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {


  }

  ngOnInit() {
    this.setPermissions();
  }

  redirectToDetails($event) {
    if (this.clickable) {
      this.router.navigate(['campaigns/user', this.campaign.user_id, 'post', this.campaign.post_id]);
    }
  }

  private setPermissions() {
    let profile = this.authService.getProfile();

    if (profile && profile.username) {
      this.donateAllowed = this.campaign.user_id !== profile.username;
    }
  }

}
