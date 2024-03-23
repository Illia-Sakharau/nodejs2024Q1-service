import { Album } from '../entities/album.entity';

function prepareAlbumForResponse(album: Album) {
  const { artist, ...otherInfo } = album;
  return { artistId: artist?.id || null, ...otherInfo };
}

export default prepareAlbumForResponse;
