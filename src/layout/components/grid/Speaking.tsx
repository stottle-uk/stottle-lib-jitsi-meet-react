import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useJitsiStats } from '../../../conference/hooks/useJitsiStats';

interface OwnProps {
  userId: string;
}

const Speaking: React.FC<OwnProps> = ({ userId }) => {
  const { speakers } = useJitsiStats();

  return (
    <span>
      {(speakers[userId] || 0) > 0.05 && (
        <FontAwesomeIcon icon={'microphone'} color="green" />
      )}
    </span>
  );
};

export default Speaking;
