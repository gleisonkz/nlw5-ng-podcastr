import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'pd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentDate = new Date();
  isChecked = false;

  @Output() openSide = new EventEmitter<void>();

  constructor(@Inject(DOCUMENT) private ngDocument: Document) {}

  toggleTheme() {
    this.ngDocument.documentElement.classList.toggle('dark-mode');
  }
}
