export interface AlbumInterface {
  id: number;
  title: string;
  releaseDate: string;
  musics: string[];
  artistName: string;
}

export interface FindOneAlbumInterface {
  index: number;
  id: number;
  title: string;
  releaseDate: string;
  musics: string[];
  artistName: string;
}
