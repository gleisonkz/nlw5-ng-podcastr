import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  getEpisodeByID(episodeID: string): Observable<Episode> {
    return this.httpClient.get<Episode>(
      `${this.baseURL}/episodes/${episodeID}`
    );
  }
  constructor(private httpClient: HttpClient) {}
  readonly baseURL = 'http://localhost:3000';

  getEpisodes(): Observable<Episode[]> {
    const params = {
      _limit: '12',
      _sort: 'published_at',
      _order: 'desc',
    };

    return this.httpClient.get<Episode[]>(`${this.baseURL}/episodes`, {
      params,
    });
  }
}
