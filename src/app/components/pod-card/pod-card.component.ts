import { Component, Input, OnInit } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';

@Component({
  selector: 'pd-pod-card',
  templateUrl: './pod-card.component.html',
  styleUrls: ['./pod-card.component.scss'],
})
export class PodCardComponent implements OnInit {
  currentDate = new Date();
  @Input() episode: Episode;
  constructor() {}

  ngOnInit(): void {}
}
