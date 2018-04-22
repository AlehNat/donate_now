import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuVisible: boolean = false;

  constructor(
    private menuService: MenuService,
  ) {

  }

  ngOnInit() {
    this.subscribeToMenuState();
  }

  private subscribeToMenuState() {
    this.menuService.menuVisible$.subscribe(visible => this.menuVisible = visible)
  }
}
