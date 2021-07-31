import React from 'react';
import Devices from '../devices/Devices';
import LobbyForm from './LobbyForm';

interface OwnProps {
  joinConference: (username: string, password?: string) => void;
}

const Lobby: React.FC<OwnProps> = ({ joinConference }) => {
  return (
    <>
      <LobbyForm joinConference={joinConference} />

      <hr />

      <Devices />
    </>
  );
};

export default Lobby;
