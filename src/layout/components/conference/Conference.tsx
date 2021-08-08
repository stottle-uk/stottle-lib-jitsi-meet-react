import React from 'react';
import { useJitsiConference } from '../../../conference/hooks/useJitsiConference';
import Lobby from '../lobby/Lobby';
import ConferenceLayout from './ConferenceLayout';

interface OwnProps {
  // leaveConference: () => void;
}

const Conference: React.FC<OwnProps> = () => {
  const { isJoined, joinConference } = useJitsiConference();

  // useEffect(() => () => leaveConference(), []);

  const join = (username: string, password?: string) =>
    joinConference(username, password);

  return isJoined ? (
    <ConferenceLayout />
  ) : (
    <Lobby style={{ maxWidth: '650px' }} joinConference={join} />
  );
};

export default Conference;
