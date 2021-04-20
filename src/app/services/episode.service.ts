import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private httpClient: HttpClient) {}
  readonly baseURL = 'http://localhost:3000/episodes';

  sortByDate(episodes: Episode[]): Episode[] {
    const sortedEpisodes: Episode[] = episodes
      .map((c) => ({ ...c, published_at: new Date(c.published_at) }))
      .sort((a, b) => a.published_at.getTime() - b.published_at.getTime());
    return sortedEpisodes;
  }

  getLastTwoEpisodes(data: Episode[]): [Episode, Episode] {
    const sortedEpisodes = this.sortByDate(data);

    const lastTwoEpisodes: [Episode, Episode] = [
      sortedEpisodes[sortedEpisodes.length - 1],
      sortedEpisodes[sortedEpisodes.length - 2],
    ];

    return lastTwoEpisodes;
  }

  getRecentEpisodes(): Observable<[Episode, Episode]> {
    return this.httpClient.get<[Episode, Episode]>(`${this.baseURL}?_limit=2`);
  }
}
