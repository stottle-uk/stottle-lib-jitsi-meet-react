import React from 'react';
import { useJitsiStats } from '../../../conference/hooks/useJitsiStats';

interface OwnProps {
  userId: string;
}

const Speaking: React.FC<OwnProps> = ({ userId }) => {
  const { speakers } = useJitsiStats();

  return <span>{(speakers[userId] || 0) > 0.05 && 'SPEAKING!'}</span>;
};

export default Speaking;
