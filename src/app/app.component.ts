import { Component } from '@angular/core';

@Component({
  selector: 'pd-root',
  template: `
    <main>
      <pd-header></pd-header>
      <router-outlet></router-outlet>
    </main>
    <aside>
      <pd-player></pd-player>
    </aside>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
