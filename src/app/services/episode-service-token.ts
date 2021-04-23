import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import { EpisodeStorageService } from 'src/app/services/episode-storage.service';
import { EpisodeService } from 'src/app/services/episode.service';
import { environment } from 'src/environments/environment';

export interface IEpisodeService {
  getEpisodeByID(episodeID: string): Observable<Episode>;
  getEpisodes(): Observable<Episode[]>;
}

export function tokenServiceFactory(
  storage: EpisodeStorageService,
  service: EpisodeService
) {
  if (environment.production) {
    return storage;
  }
  return service;
}

export const EPISODE_SERVICE_TOKEN = new InjectionToken<IEpisodeService>(
  'EpisodeServiceToken'
);
