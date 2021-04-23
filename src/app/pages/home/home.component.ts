import { Component, Inject, OnInit } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import {
  EPISODE_SERVICE_TOKEN,
  IEpisodeService,
} from 'src/app/services/episode-service-token';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    @Inject(EPISODE_SERVICE_TOKEN)
    private episodeService: IEpisodeService,
    private playerService: PlayerService
  ) {}
  latestEpisodes: Episode[];
  nextEpisodes: Episode[];
  private allEpisodes: Episode[];

  displayedColumns: string[] = [
    'podcast',
    'members',
    'published_at',
    'duration',
    'action',
  ];

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe((episodes) => {
      this.allEpisodes = [...episodes].reverse();
      this.latestEpisodes = episodes.slice(0, 2);
      this.nextEpisodes = episodes.slice(2);
    });
  }

  playAudio(episode: Episode) {
    const index = this.allEpisodes.findIndex((c) => c === episode);
    this.playerService.playList(index, this.allEpisodes);
  }
}
