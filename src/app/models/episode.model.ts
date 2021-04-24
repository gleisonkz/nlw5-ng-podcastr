interface Episode {
  id: string;
  title: string;
  shortTitle: string;
  members: string;
  published_at: Date | string;
  thumbnail: string;
  description: string;
  file: EpisodeFile;
}

interface EpisodeFile {
  url: string;
  type: string;
  duration: number;
}

export { Episode, EpisodeFile };
