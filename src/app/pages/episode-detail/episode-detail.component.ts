import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from 'src/app/models/episode.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailPageComponent implements OnInit {
  episode: Episode;
  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.episode = this.activatedRoute.snapshot.data.episode;
  }

  play(): void {
    this.playerService.resetList();
    this.playerService.play(this.episode);
  }
}
