import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../../services/models/user.model';

@Component({
  selector: 'profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.scss']
})
export class ProfileWidgetComponent implements OnInit {

  @Input() public profile: UserModel;


  constructor() { }

  ngOnInit() {
  }

}
