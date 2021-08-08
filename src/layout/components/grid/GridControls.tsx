import React from 'react';
import { useJitsiActions } from '../../../conference/hooks/useJitsiActions';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
}

const GridControls: React.FC<OwnProps> = ({ userId, ...props }) => {
  const { kickParticipant, muteParticipant } = useJitsiActions();

  return (
    <div {...props}>
      <button onClick={() => kickParticipant(userId)}>Kick</button>
      <button onClick={() => muteParticipant(userId, 'video')}>
        muteVideo
      </button>
      <button onClick={() => muteParticipant(userId, 'audio')}>
        muteAudio
      </button>
    </div>
  );
};

export default GridControls;
