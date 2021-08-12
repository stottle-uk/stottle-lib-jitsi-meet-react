import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useJitsiActions } from '../../../conference/hooks/useJitsiActions';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
}

const GridControls: React.FC<OwnProps> = ({ userId, ...props }) => {
  const { kickParticipant, muteParticipant } = useJitsiActions();

  return (
    <div {...props}>
      <button className="menu-btn">
        <FontAwesomeIcon icon="bars" color="white" />
      </button>
      <div>
        {/* <button onClick={() => muteParticipant(userId, 'video')}>V</button> */}
        <button onClick={() => muteParticipant(userId, 'audio')}>
          Mute Audio
        </button>
        <button onClick={() => kickParticipant(userId)}>Kick User</button>
      </div>
    </div>
  );
};

export default GridControls;
