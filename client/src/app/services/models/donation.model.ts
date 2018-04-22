export interface Donation {
  from: string;
  to: string;
  post_id: string;
  amount: string;
  comment: string;

}

export class DonationModel implements Donation {
  from: string;
  to: string;
  post_id: string;
  amount: string;
  comment: string;
  
  constructor(data: Donation) {
    this.from = data.from;
    this.to = data.to;
    this.post_id = data.post_id;
    this.amount = data.amount;
    this.comment = data.comment;
  }
}
