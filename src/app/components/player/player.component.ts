import { Component, EventEmitter, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'pd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  currentEpisode$ = this.playerService.currentEpisode$;
  isPlaying$ = this.playerService.isPlaying$;
  timeElapsed$ = this.playerService.timeElapsed$;
  currentDuration$ = this.playerService.duration$;
  hasPrevious$ = this.playerService.hasPrevious$;
  hasNext$ = this.playerService.hasNext$;
  isLooping$ = this.playerService.isLooping$;
  @Output() closeSide = new EventEmitter<void>();

  constructor(private playerService: PlayerService) {}

  sliderThumbChange(event: MatSliderChange) {
    if (!event.value) return;
    this.playerService.seekAudio(event.value);
  }

  togglePlay() {
    this.playerService.togglePlay();
  }

  setLooping() {
    this.playerService.setLooping();
  }

  playNext() {
    this.playerService.playNext();
  }
  playPrevious() {
    this.playerService.playPrevious();
  }
}
