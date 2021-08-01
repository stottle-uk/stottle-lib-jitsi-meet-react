import React, { memo, useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';

interface OwnProps {
  track: JitsiTrack;
  dispose?: boolean;
  onMuteChange: (muted: boolean) => void;
}

const AudioTrack: React.FC<OwnProps> = ({ track, dispose, onMuteChange }) => {
  const audioEl = useRef<HTMLAudioElement | null>(null);

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
      track => onMuteChange(track.isMuted())
    );

    return () => {
      sub.unsubscribe();
    };
  }, [track, onMuteChange]);

  return <audio autoPlay={true} ref={audioEl} />;
};

export default memo(AudioTrack);
