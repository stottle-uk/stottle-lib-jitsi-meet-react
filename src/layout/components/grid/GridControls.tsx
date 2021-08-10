import React from 'react';
import { useJitsiActions } from '../../../conference/hooks/useJitsiActions';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
}

const GridControls: React.FC<OwnProps> = ({ userId, ...props }) => {
  const { kickParticipant, muteParticipant } = useJitsiActions();

  return (
    <div {...props}>
      <button className="menu-btn">...</button>
      <div>
        <button onClick={() => kickParticipant(userId)}>K</button>
        <button onClick={() => muteParticipant(userId, 'video')}>V</button>
        <button onClick={() => muteParticipant(userId, 'audio')}>A</button>
      </div>
    </div>
  );
};

export default GridControls;
