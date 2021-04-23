import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import {
  EPISODE_SERVICE_TOKEN,
  IEpisodeService,
} from 'src/app/services/episode-service-token';

@Injectable({
  providedIn: 'root',
})
export class EpisodeResolver implements Resolve<Observable<Episode>> {
  constructor(
    @Inject(EPISODE_SERVICE_TOKEN)
    private episodeService: IEpisodeService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Episode> {
    const episodeID = route.params.id;
    return this.episodeService.getEpisodeByID(episodeID);
  }
}
