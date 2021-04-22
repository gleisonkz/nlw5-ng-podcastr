import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import { AudioService } from 'src/app/services/audio.service';
import { mapEpisodeToPlayerEpisode } from 'src/app/utils/getPlayerEpisode';

export interface PlayerEpisode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private episodes$$ = new Subject<PlayerEpisode[]>();
  private currentEpisode$$ = new Subject<PlayerEpisode>();
  private isPlaying$$ = new BehaviorSubject<boolean>(false);

  public episodes$ = this.episodes$$.asObservable();
  public currentEpisode$ = this.currentEpisode$$.asObservable();
  public isPlaying$ = this.isPlaying$$.asObservable();

  constructor(private audioService: AudioService) {}

  setInitialValue(episodes: PlayerEpisode[]) {
    this.episodes$$.next(episodes);
  }

  play(episode: Episode) {
    const playerEpisode = mapEpisodeToPlayerEpisode(episode);
    this.currentEpisode$$.next(playerEpisode);
    this.audioService.setAudioUrl(playerEpisode.url);
    this.isPlaying$$.next(true);
  }

  togglePlay(): void {
    this.audioService.toggleAudio();
    this.isPlaying$$.next(!this.isPlaying$$.value);
  }

  private updatePlayingState(): void {
    this.audioService.getPlayerStatus().subscribe((status) => {
      console.log(status);
    });
  }
}
