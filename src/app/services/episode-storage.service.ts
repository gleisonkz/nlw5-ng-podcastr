import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode } from 'src/app/models/episode.model';
import { IEpisodeService } from 'src/app/services/episode-service-token';
import { EPISODES } from 'src/app/services/episode.mock';

import { Injectable } from '@angular/core';

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
    const foundEpisode = this.episodes.find((episode) => episode.id === episodeID);
    if (foundEpisode == undefined) throw new Error('episode not founded');
    return of(foundEpisode);
  }

  getEpisodes(): Observable<Episode[]> {
    return of(this.episodes).pipe(
      map((episodes) => {
        return episodes.map((episode) => {
          return {
            ...episode,
            shortTitle: episode.title.match(/(Fala[Dd]ev #[0-9]+)/)![0],
          };
        });
      })
    );
  }
}
