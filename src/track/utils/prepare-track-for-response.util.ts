/* eslint-disable @typescript-eslint/no-unused-vars */
import { Track } from '../entities/track.entity';

function prepareTrackForResponse(track: Track) {
  const { artist, album, isFavorite, ...otherInfo } = track;
  return {
    artistId: artist?.id || null,
    albumId: album?.id || null,
    ...otherInfo,
  };
}

export default prepareTrackForResponse;
