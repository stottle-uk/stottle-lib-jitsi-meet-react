import React, { memo, useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';

interface OwnProps {
  track: JitsiTrack;
  dispose?: boolean;
  onMuteChange: (muted: boolean) => void;
}

const VideoTrack: React.FC<OwnProps> = ({ track, dispose, onMuteChange }) => {
  const videoEl = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    videoEl.current && track.attach(videoEl.current);

    return () => {
      track.isLocal() && dispose && track.dispose();
    };
  }, [videoEl, track, dispose]);

  useEffect(() => {
    const sub = fromEvent<JitsiTrack>(track, TRACK_MUTE_CHANGED).subscribe(
      track => onMuteChange(track.isMuted())
    );

    return () => {
      sub.unsubscribe();
    };
  }, [track, onMuteChange]);

  return <video autoPlay={true} ref={videoEl} />;
};

export default memo(VideoTrack);
