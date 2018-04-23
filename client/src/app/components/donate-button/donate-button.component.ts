import { Component, Input, OnInit } from '@angular/core';
import { DonateService } from '../../services/donate.service';
import { CampaignModel } from '../../services/models/campaign.model';
import { Donation, DonationModel } from '../../services/models/donation.model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'donate-button',
  templateUrl: './donate-button.component.html',
  styleUrls: ['./donate-button.component.scss']
})
export class DonateButtonComponent implements OnInit {

  @Input() public campaign: CampaignModel;

  public showDonateDetails: boolean = false;

  public form: FormGroup;

  constructor(
    private donateService: DonateService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  makeDonation() {
    this.showDonateDetails = true;
  }

  donateNow() {
    if (this.showDonateDetails && this.form.valid) {
      this.performDonation();
    }
  }

  private performDonation() {
    let data = <Donation>{
      from: this.authService.getProfile().username,
      to: this.campaign.user_id,
      post_id: this.campaign.post_id,
      amount: this.form.get('amount').value.toString(),
      comment: this.form.get('comment').value
    };

    let donation = new DonationModel(data);
    this.donateService.makeDonation(donation);
  }

  private initForm() {
    this.form = this.fb.group({
      amount: ['', Validators.compose([Validators.required, Validators.min(0)])],
      comment: [''],
    });
  }
}
