import { Component, OnInit } from '@angular/core';
import { CampaignModel } from '../services/models/campaign.model';
import { CampaignsService } from '../services/campaigns.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {

  public campaign: CampaignModel;
  public loading: boolean = true;

  private userid: string;
  private postid: string;


  constructor(
    private campaignService: CampaignsService,
    private route: ActivatedRoute,
  ) {

    this.fetchRouteData();
  }

  ngOnInit() {

  }


  private fetchRouteData() {
    this.userid = this.route.snapshot.params.userid;
    this.postid = this.route.snapshot.params.postid;

    this.campaignService.getCampaign(this.userid, this.postid)
      .subscribe(
        (campaign) => {
          this.campaign = campaign;
          this.loading = false;
        }
      );
  }
}
