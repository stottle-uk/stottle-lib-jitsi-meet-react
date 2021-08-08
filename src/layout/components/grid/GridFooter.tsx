import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import Speaking from './Speaking';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  username: string;
  video: JitsiTrack;
  audio: JitsiTrack;
}

const GridFooter: React.FC<OwnProps> = ({
  userId,
  username,
  video,
  audio,
  ...props
}) => {
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

  return (
    <div {...props}>
      <p>
        {username} <Speaking userId={userId} />
        {isMuted.audio && (
          <FontAwesomeIcon icon={'microphone-slash'} color="red" />
        )}
      </p>
    </div>
  );
};

export default GridFooter;
