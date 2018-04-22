import * as moment from 'moment';

export interface Transaction {
  amount_sbd: number;
  amount_steem: number;
  timestamp: string;
  comment: string;
  counterparty: string;
}

export class TransactionModel implements Transaction {

  public amount_sbd: number;
  public amount_steem: number;
  public timestamp: string;
  public comment: string;
  public counterparty: string;

  constructor(data) {
    this.amount_sbd = data.amount_sbd || 0;
    this.amount_steem = data.amount_steem || 0;
    this.timestamp = data.timestamp;
    this.comment = data.comment;
    this.counterparty = data.counterparty;
  }


  dateCreated(): string {
    return moment.utc(this.timestamp).fromNow();
  }

}
