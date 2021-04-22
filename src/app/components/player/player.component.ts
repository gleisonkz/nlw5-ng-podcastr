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

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.isPlaying$ = this.playerService.isPlaying$;
    this.playerService.currentEpisode$.subscribe((episode) => {
      this.currentEpisode = episode;
    });
  }

  togglePlay() {
    this.playerService.togglePlay();
  }
}
