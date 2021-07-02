import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'pd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(@Inject(DOCUMENT) private ngDocument: Document) {}

  currentDate = new Date();
  isChecked = false;
  @Output() openSide = new EventEmitter<void>();
  toggleTheme() {
    this.ngDocument.documentElement.classList.toggle('dark-mode');
  }
}
