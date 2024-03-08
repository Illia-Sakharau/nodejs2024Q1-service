export type AlbumId = string;

export class Album {
  id: AlbumId; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
