import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('sideNav', { static: true }) sideNav: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.isHandset$.subscribe((isMobile) => {
      isMobile && this.sideNav.close();
      !isMobile && this.sideNav.open();
    });
  }

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 599px)')
    .pipe(map((result: BreakpointState) => result.matches));

  openSideNav() {
    this.sideNav.open();
  }
  closeSideNav() {
    this.sideNav.close();
  }
}
