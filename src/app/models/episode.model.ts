interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: Date;
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
