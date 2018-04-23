export interface User {
  username: string;
}

export class UserModel implements User {
  username: string;

  balance: number;
  lastDiff: number;

  constructor(data) {
    this.username = data.username;
  }

  public updateBalances(balance, diff=0) {
    this.balance = balance;

    if (diff) {
      this.lastDiff = diff;
    }
  }

  public getAtUsername(): string {
    return `@${this.username}`;
  }
}

