import { EPISODE_SERVICE_TOKEN } from 'src/app/services/episode-service-token';

import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class EpisodeIdParamNotFoundError extends Error {
  constructor() {
    super('EpisodeID parameter was not found in the route.');
  }
}

export function getEpisodeByID() {
  const episodeID = inject(ActivatedRoute).snapshot.params.id;
  if (!episodeID) throw new EpisodeIdParamNotFoundError();

  return inject(EPISODE_SERVICE_TOKEN).getEpisodeByID(episodeID);
}
