import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerEpisode, PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'pd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  currentEpisode: PlayerEpisode;
  isPlaying$: Observable<boolean>;
  timeElapsed$: Observable<string>;
  currentDuration$: Observable<number>;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.isPlaying$ = this.playerService.isPlaying$;
    this.timeElapsed$ = this.playerService.timeElapsed$;
    this.currentDuration$ = this.playerService.duration$;
    this.playerService.currentEpisode$.subscribe((episode) => {
      this.currentEpisode = episode;
    });
  }

  togglePlay() {
    if (!this.currentEpisode) return;
    this.playerService.togglePlay();
  }
}
