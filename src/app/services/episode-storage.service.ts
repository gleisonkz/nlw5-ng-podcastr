import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import { IEpisodeService } from 'src/app/services/episode-service-token';
import { EPISODES } from 'src/app/services/episode.mock';

@Injectable({
  providedIn: 'root',
})
export class EpisodeStorageService implements IEpisodeService {
  private readonly STORAGE_KEY = 'EPISODES';

  constructor() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(EPISODES));
  }

  get episodes(): Episode[] {
    const data = localStorage.getItem(this.STORAGE_KEY) || '[]';
    return JSON.parse(data);
  }

  getEpisodeByID(episodeID: string): Observable<Episode> {
    const foundEpisode = this.episodes.find(
      (episode) => episode.id === episodeID
    );
    if (foundEpisode == undefined) throw new Error('episode not founded');
    return of(foundEpisode);
  }

  getEpisodes(): Observable<Episode[]> {
    return of(this.episodes);
  }
}
