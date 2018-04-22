import { Component, Input, OnInit } from '@angular/core';
import { CampaignsService } from '../../services/campaigns.service';
import { CampaignModel } from '../../services/models/campaign.model';

@Component({
  selector: 'campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.css']
})
export class CampaignsListComponent implements OnInit {

  @Input() public username: string;

  public campaigns: CampaignModel[];

  public loading: boolean = true;

  constructor(
    private campaignsService: CampaignsService,
  ) {

  }

  ngOnInit() {
    this.subscribeToData();
  }

  private subscribeToData() {
    this.campaignsService.getCampaigns(this.username).subscribe(
      (items: CampaignModel[]) => {
        this.loading = false;
        this.campaigns = items;
        console.log('campaign items are', items);
      }
    );
  }

}
