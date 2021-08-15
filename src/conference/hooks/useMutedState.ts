import { useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { TRACK_MUTE_CHANGED } from '../models/events/track';
import { JitsiTrack } from '../models/JitsiTrack';

export const useMutedSate = (video: JitsiTrack, audio: JitsiTrack) => {
  const [isMuted, setMuted] = useState({
    audio: audio.isMuted(),
    video: video.isMuted()
  });

  useEffect(() => {
    const sub = merge(
      fromEvent<JitsiTrack>(audio, TRACK_MUTE_CHANGED),
      fromEvent<JitsiTrack>(video, TRACK_MUTE_CHANGED)
    ).subscribe(track => {
      setMuted(state => ({ ...state, [track.getType()]: track.isMuted() }));
    });

    return () => sub.unsubscribe();
  }, [audio, video]);

  return isMuted;
};
