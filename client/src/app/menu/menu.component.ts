import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuVisible: boolean = false;

  constructor(
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.checkMenuVisibility();
  }

  private checkMenuVisibility() {
    this.menuVisible = this.authService.isLoggedIn();
  }
}
