import { Component, OnInit } from '@angular/core';
import { CampaignsService } from '../../services/campaigns.service';
import { CampaignModel } from '../../services/models/campaign.model';

@Component({
  selector: 'campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.css']
})
export class CampaignsListComponent implements OnInit {

  public campaigns: CampaignModel[] = [];

  constructor(
    private campaignsService: CampaignsService,
  ) { }

  ngOnInit() {
    this.subscribeToData();
  }

  private subscribeToData() {
    this.campaignsService.getCurrentUserCampaigns().subscribe(
      (items: CampaignModel[]) => {
        this.campaigns = items;
        console.log('campaign items are', items);
      }
    );
  }

}
