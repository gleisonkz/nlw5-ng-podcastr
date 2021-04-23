import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import { PlayerEpisode } from 'src/app/models/player-episode.model';
import { mapEpisodeToPlayerEpisode } from 'src/app/utils/mapPlayerEpisode';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private audio: HTMLAudioElement;
  private playerStatus = new BehaviorSubject('paused');

  private episodes$$ = new Subject<PlayerEpisode[]>();
  private episodesList: Episode[] = [];
  private currentEpisodeIndex = 0;

  private currentEpisode$$ = new Subject<PlayerEpisode>();
  private isPlaying$$ = new BehaviorSubject<boolean>(false);
  private isLooping$$ = new BehaviorSubject<boolean>(false);
  private hasPrevious$$ = new BehaviorSubject<boolean>(false);
  private hasNext$$ = new BehaviorSubject<boolean>(false);
  private timeElapsed$$ = new BehaviorSubject<number>(0);
  private duration$$ = new BehaviorSubject<number>(0.1);

  set hasNext(hasNext: boolean) {
    this.hasNext$$.next(hasNext && this.isPlaying$$.value);
  }

  set hasPrevious(hasPrevious: boolean) {
    this.hasPrevious$$.next(hasPrevious && this.isPlaying$$.value);
  }

  private set isLooping(value: boolean) {
    this.isLooping$$.next(value);
  }

  private get isLooping(): boolean {
    return this.isLooping$$.value;
  }

  public episodes$ = this.episodes$$.asObservable();
  public currentEpisode$ = this.currentEpisode$$.asObservable();
  public isPlaying$ = this.isPlaying$$.asObservable();
  public isLooping$ = this.isLooping$$.asObservable();
  public timeElapsed$ = this.timeElapsed$$.asObservable();
  public duration$ = this.duration$$.asObservable();
  public hasPrevious$ = this.hasPrevious$$.asObservable();
  public hasNext$ = this.hasNext$$.asObservable();

  constructor() {
    this.audio = new Audio();
    this.attachListeners();
  }

  private calculateTime = () => {
    let currentTime = this.audio.currentTime;
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

  private setAudioUrl(src: string): void {
    this.audio.src = src;
    this.playAudio();
  }

  private setTimeElapsed(currentTimeInSeconds: number): void {
    this.timeElapsed$$.next(Math.floor(currentTimeInSeconds));
  }

  private playAudio(): void {
    this.audio.play();
    this.isPlaying$$.next(true);
  }

  setInitialValue(episodes: PlayerEpisode[]) {
    this.episodes$$.next(episodes);
  }

  setLooping() {
    const loopState = !this.audio.loop;
    this.audio.loop = loopState;
    this.isLooping = loopState;
  }

  play(episode: Episode) {
    const playerEpisode = mapEpisodeToPlayerEpisode(episode);
    const { duration } = episode.file;

    this.currentEpisode$$.next(playerEpisode);
    this.duration$$.next(duration);
    this.setAudioUrl(playerEpisode.url);
  }

  resetList() {
    this.hasPrevious = false;
    this.hasNext = false;
    this.currentEpisodeIndex = 0;
    this.episodesList = [];
  }

  playList(currentIndex: number, episodes: Episode[]) {
    this.episodesList = episodes;
    this.setCurrentEpisodeIndex(currentIndex);
  }

  playNext(): void {
    this.setCurrentEpisodeIndex(this.currentEpisodeIndex + 1);
  }
  playPrevious(): void {
    this.setCurrentEpisodeIndex(this.currentEpisodeIndex - 1);
  }

  setCurrentEpisodeIndex(newIndex: number) {
    const episode = this.episodesList[newIndex];
    this.currentEpisodeIndex = newIndex;

    const hasPrevious = newIndex > 0;
    const hasNext = newIndex + 1 < this.episodesList.length;

    this.play(episode);

    this.hasPrevious = hasPrevious;
    this.hasNext = hasNext;
  }

  togglePlay(): void {
    this.toggleAudio();
    this.isPlaying$$.next(!this.isPlaying$$.value);
  }

  pauseAudio(): void {
    this.audio.pause();
  }

  toggleAudio(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  seekAudio(position: number): void {
    this.audio.currentTime = position;
    this.setTimeElapsed(position);
  }
}
