import React, { memo, useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';

interface OwnProps {
  track: JitsiTrack;
  dispose?: boolean;
}

const VideoTrack: React.FC<OwnProps> = ({ track, dispose }) => {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(track.isMuted());

  useEffect(() => {
    if (!videoEl.current) return;

    track.attach(videoEl.current);

    return () => {
      track.isLocal() && dispose && track.dispose();
    };
  }, [videoEl, track, dispose]);

  useEffect(() => {
    const sub = fromEvent<JitsiTrack>(track, TRACK_MUTE_CHANGED).subscribe(
      track => setIsMuted(track.isMuted())
    );

    return () => {
      sub.unsubscribe();
    };
  }, [track]);

  return (
    <video autoPlay={true} ref={videoEl} className={isMuted ? 'muted' : ''} />
  );
};

export default memo(VideoTrack);
