import { Injectable } from '@angular/core';
import { DonationModel } from './models/donation.model';

@Injectable()
export class DonateService {

  constructor() {
  }

  makeDonation(donation: DonationModel) {
      donation.amount += '%20SBD';
      let url = 'https://steemconnect.com/sign/transfer?from=' + donation.from
        + '&to=' + donation.to
        + '&amount=' + donation.amount
        + '&memo=' + donation.comment
        + '%20(' + donation.post_id + ')';
      window.open(url, '_blank');
  }
}
