/* eslint-disable @typescript-eslint/no-unused-vars */
import { Artist } from '../entities/artist.entity';

function prepareArtistForResponse(artist: Artist) {
  const { isFavorite, ...otherInfo } = artist;
  return { ...otherInfo };
}

export default prepareArtistForResponse;
