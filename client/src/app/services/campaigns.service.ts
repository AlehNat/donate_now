import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Campaign, CampaignModel } from './models/campaign.model';

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

  public getCampaign(user_id: string, post_id: string): Observable<CampaignModel> {
    let url = `${this.baseUrl}${this.urlGet}`;
    let options = {params: {user_id, post_id}};

    return this.http.get(url, options)
      .map((data: Object) => new CampaignModel(data));
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
    let {username} = this.authService.getProfile();

    return this.getCampaigns(username);
  }

  public createCampaign(data: CampaignModel): Observable<CampaignModel> {
    let url = `${this.baseUrl}${this.urlPost}`;
    let body = JSON.stringify(data.asNewCampaign());

    let resource$ = this.http.post(url, body)
      .map((data) => new CampaignModel(data));

    return resource$;
  }

}
