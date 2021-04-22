import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'pd-pod-card',
  templateUrl: './pod-card.component.html',
  styleUrls: ['./pod-card.component.scss'],
})
export class PodCardComponent implements OnInit, AfterViewInit {
  currentDate = new Date();
  @Input() episode: Episode;
  constructor(
    private playerService: PlayerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  playAudio() {
    this.playerService.play(this.episode);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
