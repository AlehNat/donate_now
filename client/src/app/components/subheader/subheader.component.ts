import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {

  @Input() public title;

  constructor() { }

  ngOnInit() {
  }

}
