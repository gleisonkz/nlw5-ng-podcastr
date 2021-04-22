import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import { EpisodeService } from 'src/app/services/episode.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodeResolver implements Resolve<Observable<Episode>> {
  constructor(private episodeService: EpisodeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Episode> {
    const episodeID = route.params.id;
    return this.episodeService.getEpisodeByID(episodeID);
  }
}
