import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentDate = new Date();
  @Output() openSide = new EventEmitter<void>();
}
