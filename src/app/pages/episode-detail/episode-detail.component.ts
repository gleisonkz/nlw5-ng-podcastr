import { lastValueFrom } from 'rxjs';
import { getEpisodeByID } from 'src/app/functions/get-episode-by-id.inject.function';
import { PlayerService } from 'src/app/services/player.service';

import { Component } from '@angular/core';

@Component({
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailPageComponent {
  episode$ = getEpisodeByID();

  constructor(private playerService: PlayerService) {}

  async play(): Promise<void> {
    this.playerService.resetList();
    this.playerService.play(await lastValueFrom(this.episode$));
  }
}
