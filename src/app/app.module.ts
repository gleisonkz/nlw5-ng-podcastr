import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  EPISODE_SERVICE_TOKEN,
  tokenServiceFactory,
} from 'src/app/services/episode-service-token';
import { EpisodeStorageService } from 'src/app/services/episode-storage.service';
import { EpisodeService } from 'src/app/services/episode.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PlayerComponent } from './components/player/player.component';
import { PodCardComponent } from './components/pod-card/pod-card.component';
import { EpisodeDetailPageComponent } from './pages/episode-detail/episode-detail.component';
import { HomePageComponent } from './pages/home/home.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { HourPipe } from './pipes/hour.pipe';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerComponent,
    PodCardComponent,
    HomePageComponent,
    EpisodeDetailPageComponent,
    HourPipe,
    CustomDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: EPISODE_SERVICE_TOKEN,
      useFactory: tokenServiceFactory,
      deps: [EpisodeStorageService, EpisodeService],
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
