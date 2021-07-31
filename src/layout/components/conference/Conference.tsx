import React from 'react';
import { useJitsiConference } from '../../../conference/hooks/useJitsiConference';
import Lobby from '../Lobby';
import ConferenceLayout from './ConferenceLayout';

interface OwnProps {
  // leaveConference: () => void;
}

const Conference: React.FC<OwnProps> = () => {
  const { isJoined, joinConference, leaveConference } = useJitsiConference();

  // useEffect(() => () => leaveConference(), [leaveConference]);

  const join = (username: string, password?: string) =>
    joinConference(username, password);

  return isJoined ? (
    <ConferenceLayout leaveConference={leaveConference} />
  ) : (
    <Lobby joinConference={join} />
  );
};

export default Conference;
