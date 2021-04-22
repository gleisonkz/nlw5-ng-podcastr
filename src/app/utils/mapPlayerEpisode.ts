import { Episode } from 'src/app/models/episode.model';
import { PlayerEpisode } from 'src/app/services/player.service';

export function mapEpisodeToPlayerEpisode(episodes: Episode[]): PlayerEpisode[];
export function mapEpisodeToPlayerEpisode(episodes: Episode): PlayerEpisode;
export function mapEpisodeToPlayerEpisode(episodes: any): any {
  if (Array.isArray(episodes)) {
    return episodes.map(
      ({ title, members, thumbnail, file: { duration, url } }) => ({
        title,
        members,
        thumbnail,
        duration,
        url,
      })
    );
  }

  return {
    title: episodes.title,
    members: episodes.members,
    thumbnail: episodes.thumbnail,
    duration: episodes.file.duration,
    url: episodes.file.url,
  };
}
