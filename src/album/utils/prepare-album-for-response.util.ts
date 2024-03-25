/* eslint-disable @typescript-eslint/no-unused-vars */
import { Album } from '../entities/album.entity';

function prepareAlbumForResponse(album: Album) {
  const { artist, isFavorite, ...otherInfo } = album;
  return { artistId: artist?.id || null, ...otherInfo };
}

export default prepareAlbumForResponse;
