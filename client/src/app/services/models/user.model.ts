export interface User {
  username: string;
}

export class UserModel implements User {
  username: string;

  constructor(data) {
    this.username = data.username;
  }

}

