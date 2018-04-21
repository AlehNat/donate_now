import { Component, Input, OnInit } from '@angular/core';
import { CampaignModel } from '../../../services/models/campaign.model';

@Component({
  selector: 'campaigns-list-item',
  templateUrl: './campaigns-list-item.component.html',
  styleUrls: ['./campaigns-list-item.component.css']
})
export class CampaignsListItemComponent implements OnInit {

  @Input()
  public campaign: CampaignModel;

  constructor() { }

  ngOnInit() {
  }

}
