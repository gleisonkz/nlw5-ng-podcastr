import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from 'src/app/models/episode.model';

@Component({
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
})
export class EpisodeDetailPageComponent implements OnInit {
  episode: Episode;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.episode = this.activatedRoute.snapshot.data.episode;
    console.log(this.episode);
  }
}
