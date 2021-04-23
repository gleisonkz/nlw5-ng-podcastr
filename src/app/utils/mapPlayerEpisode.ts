import { Episode } from 'src/app/models/episode.model';
import { PlayerEpisode } from 'src/app/models/player-episode.model';

export function mapEpisodeToPlayerEpisode(episodes: Episode): PlayerEpisode {
  return {
    title: episodes.title,
    members: episodes.members,
    thumbnail: episodes.thumbnail,
    duration: episodes.file.duration,
    url: episodes.file.url,
  };
}
