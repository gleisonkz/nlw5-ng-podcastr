import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { EpisodeService } from 'src/app/services/episode.service';
import { PlayerService } from 'src/app/services/player.service';
import { mapEpisodeToPlayerEpisode } from 'src/app/utils/mapPlayerEpisode';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private episodeService: EpisodeService,
    private playerService: PlayerService
  ) {}
  latestEpisodes: Episode[];
  nextEpisodes: Episode[];

  displayedColumns: string[] = [
    'podcast',
    'members',
    'published_at',
    'duration',
    'action',
  ];

  ngOnInit(): void {
    this.episodeService.getRecentEpisodes().subscribe((episodes) => {
      const playerList = mapEpisodeToPlayerEpisode(episodes);
      this.playerService.setInitialValue(playerList);
      this.latestEpisodes = episodes.slice(0, 2);
      this.nextEpisodes = episodes.slice(2);
    });
  }

  playAudio(episode: Episode) {
    this.playerService.play(episode);
  }
}
