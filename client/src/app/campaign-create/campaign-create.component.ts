import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignsService } from '../services/campaigns.service';
import { CampaignModel } from '../services/models/campaign.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CampaignsService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.initForm();
  }

  public createCampaign(event) {
    event.preventDefault();

    if (this.form.valid) {
      let data = Object.assign({}, this.form.value, {
        user_id: this.authService.getProfile().username
      });
      let campaign = new CampaignModel(data);

      this.service.createCampaign(campaign).subscribe(
        (campaign) => {
          this.router.navigate(['campaigns/user', campaign.user_id, 'post', campaign.post_id]);
        }
      )
    }
  }

  private initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      cover_image_url: ['', Validators.required],
    });
  }
}
