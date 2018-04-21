import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { CampaignModel } from './models/campaign.model';

@Injectable()
export class CampaignsService {

  public urlGet: string = '/posts';
  public urlPost: string = '/create_post';

  private baseUrl: string = 'http://localhost:5000'; // @todo: to move to app constants

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  public getCampaigns(username: string): Observable<CampaignModel[]> {
    let url = `${this.baseUrl}${this.urlGet}`;
    let options = {
      params: {
        user_id: username
      }
    };

    return this.http.get(url, options)
      .map((data: Object[]) => data.map(
        item => new CampaignModel(item)
      ));
  }

  public getCurrentUserCampaigns(): Observable<CampaignModel[]> {
    let { username } = this.authService.getProfile();

    return this.getCampaigns(username);
  }

  public createCampaign(data) {
    let url = `${this.baseUrl}${this.urlPost}`;
    let body = data;

    return this.http.post(url, body);
  }

}
