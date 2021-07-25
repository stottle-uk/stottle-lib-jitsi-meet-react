import React, { memo, useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';

interface OwnProps {
  track: JitsiTrack;
  dispose?: boolean;
}

const AudioTrack: React.FC<OwnProps> = ({ track, dispose = true }) => {
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(track.isMuted());

  useEffect(() => {
    if (!audioEl.current) return;

    if (track.isLocal()) {
      audioEl.current.muted = true;
    }

    track.attach(audioEl.current);

    return () => {
      track.isLocal() && dispose && track.dispose();
    };
  }, [audioEl, track, dispose]);

  useEffect(() => {
    const sub = fromEvent<JitsiTrack>(track, TRACK_MUTE_CHANGED).subscribe(
      track => setIsMuted(track.isMuted())
    );

    return () => {
      sub.unsubscribe();
    };
  }, [track]);

  return (
    <audio autoPlay={true} ref={audioEl} className={isMuted ? 'muted' : ''} />
  );
};

export default memo(AudioTrack);
