import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useJitsiActions } from '../../../conference/hooks/useJitsiActions';
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
        {audio.isMuted() && (
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
