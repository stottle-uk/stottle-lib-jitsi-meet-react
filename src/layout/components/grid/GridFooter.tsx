import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { useJitsiActions } from '../../../conference/hooks/useJitsiActions';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import Speaking from './Speaking';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  username: string;
  video: JitsiTrack;
  audio: JitsiTrack;
  displayUserActions: boolean;
}

const GridFooter: React.FC<OwnProps> = ({
  userId,
  username,
  video,
  audio,
  displayUserActions,
  ...props
}) => {
  const { kickParticipant, muteParticipant } = useJitsiActions();

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

  const userAction = (userId: string, action: string) => {
    if (action === 'kick') {
      kickParticipant(userId);
    }
    if (action === 'muteVideo') {
      muteParticipant(userId, 'video');
    }
    if (action === 'muteAudio') {
      muteParticipant(userId, 'audio');
    }
  };

  return (
    <div {...props}>
      <p>
        {username} <Speaking userId={userId} />
        {isMuted.audio && (
          <FontAwesomeIcon icon={'microphone-slash'} color="red" />
        )}
      </p>

      {userId !== 'local' && displayUserActions && (
        <>
          <button onClick={() => userAction(userId, 'kick')}>Kick</button>
          <button onClick={() => userAction(userId, 'muteVideo')}>
            muteVideo
          </button>
          <button onClick={() => userAction(userId, 'muteAudio')}>
            muteAudio
          </button>
        </>
      )}
    </div>
  );
};

export default GridFooter;
