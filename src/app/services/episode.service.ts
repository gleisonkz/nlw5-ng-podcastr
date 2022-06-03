import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode } from 'src/app/models/episode.model';
import { IEpisodeService } from 'src/app/services/episode-service-token';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService implements IEpisodeService {
  readonly baseURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getEpisodeByID(episodeID: string): Observable<Episode> {
    return this.httpClient.get<Episode>(
      `${this.baseURL}/episodes/${episodeID}`
    );
  }

  getEpisodes(): Observable<Episode[]> {
    const params = {
      _limit: '12',
      _sort: 'published_at',
      _order: 'desc',
    };

    return this.httpClient
      .get<Episode[]>(`${this.baseURL}/episodes`, {
        params,
      })
      .pipe(
        map((episodes) => {
          return episodes.map((c) => {
            return {
              ...c,
              shortTitle: c.title.match(/(Fala[Dd]ev #[0-9]+)/)![0],
            };
          });
        })
      );
  }
}
