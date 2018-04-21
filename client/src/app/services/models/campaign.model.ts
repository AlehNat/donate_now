import { Transaction, TransactionModel } from './transaction.model';
import * as moment from 'moment';

export interface Campaign {
  user_id: string;
  post_id: string;
  title: string;
  body: string;
  cover_image_url: string;
  timestamp: string;
  transactions: Transaction[]
}

export class CampaignModel implements Campaign {
  user_id: string;
  post_id: string;
  title: string;
  body: string;
  cover_image_url: string;
  timestamp: string;
  transactions: TransactionModel[];


  constructor(data) {
    this.post_id = data.post_id;
    this.user_id = data.user_id;
    this.title = data.title;
    this.body = data.body;
    this.cover_image_url = data.cover_image_url;
    this.timestamp = data.timestamp;
    this.transactions = data.transactions && data.transactions.length
      ? data.transactions.map(item => new TransactionModel(item)) : [];
  }

  dateCreated(): string {
    return moment(this.timestamp).fromNow();
  }
}
