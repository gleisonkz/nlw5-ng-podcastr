import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import { mapEpisodeToPlayerEpisode } from 'src/app/utils/mapPlayerEpisode';

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
  private audio: HTMLAudioElement;
  private playerStatus = new BehaviorSubject('paused');

  private episodes$$ = new Subject<PlayerEpisode[]>();
  private currentEpisode$$ = new Subject<PlayerEpisode>();
  private isPlaying$$ = new BehaviorSubject<boolean>(false);
  private timeElapsed$$ = new BehaviorSubject<string>('00:00');
  private duration$$ = new BehaviorSubject<number>(0);

  public episodes$ = this.episodes$$.asObservable();
  public currentEpisode$ = this.currentEpisode$$.asObservable();
  public isPlaying$ = this.isPlaying$$.asObservable();
  public timeElapsed$ = this.timeElapsed$$.asObservable();
  public duration$ = this.duration$$.asObservable();

  constructor() {
    this.audio = new Audio();
    this.attachListeners();
  }

  private calculateTime = () => {
    let currentTime = this.audio.currentTime;
    let duration = this.audio.duration;
    this.setTimeElapsed(currentTime);
  };

  private setPlayerStatus = (event: Event) => {
    switch (event.type) {
      case 'playing':
        this.playerStatus.next('playing');
        this.isPlaying$$.next(true);
        break;
      case 'pause':
        this.playerStatus.next('paused');
        break;
      case 'waiting':
        this.playerStatus.next('loading');
        break;
      case 'ended':
        this.playerStatus.next('ended');
        break;
      default:
        this.playerStatus.next('paused');
        this.isPlaying$$.next(false);
        break;
    }
  };

  private attachListeners(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('waiting', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  setInitialValue(episodes: PlayerEpisode[]) {
    this.episodes$$.next(episodes);
  }

  play(episode: Episode) {
    const playerEpisode = mapEpisodeToPlayerEpisode(episode);
    const { duration } = episode.file;

    this.currentEpisode$$.next(playerEpisode);
    this.duration$$.next(duration);
    this.setAudioUrl(playerEpisode.url);
  }

  togglePlay(): void {
    this.toggleAudio();
    this.isPlaying$$.next(!this.isPlaying$$.value);
  }

  setAudioUrl(src: string): void {
    this.audio.src = src;
    this.playAudio();
  }

  playAudio(): void {
    this.audio.play();
  }

  pauseAudio(): void {
    this.audio.pause();
  }

  toggleAudio(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  seekAudio(position: number): void {
    this.audio.currentTime = position;
  }

  private setTimeElapsed(ct: number): void {
    let seconds = Math.floor(ct % 60),
      displaySecs = seconds < 10 ? '0' + seconds : seconds,
      minutes = Math.floor((ct / 60) % 60),
      displayMins = minutes < 10 ? '0' + minutes : minutes;

    this.timeElapsed$$.next(displayMins + ':' + displaySecs);
  }

  public getPlayerStatus(): Observable<string> {
    return this.playerStatus.asObservable();
  }
}
