import { Track } from '../entities/track.entity';

function prepareTrackForResponse(track: Track) {
  const { artist, album, ...otherInfo } = track;
  return {
    artistId: artist?.id || null,
    albumId: album?.id || null,
    ...otherInfo,
  };
}

export default prepareTrackForResponse;
