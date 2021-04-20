import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentDate = new Date();
  constructor() {}

  ngOnInit(): void {}
}
