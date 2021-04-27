import { Component, EventEmitter, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'pd-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Output() closeSide = new EventEmitter<void>();

  constructor(public playerService: PlayerService) {}

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

  setShuffling() {
    this.playerService.setShuffling();
  }

  playNext() {
    this.playerService.playNext();
  }
  playPrevious() {
    this.playerService.playPrevious();
  }
}
