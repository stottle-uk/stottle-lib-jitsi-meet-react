import React, { CSSProperties } from 'react';
import Devices from '../devices/Devices';
import LobbyForm from './LobbyForm';

interface OwnProps {
  joinConference: (username: string, password?: string) => void;
  style?: CSSProperties;
}

const Lobby: React.FC<OwnProps> = ({ style, joinConference }) => {
  return (
    <div style={style}>
      <LobbyForm joinConference={joinConference} />

      <hr />
      <Devices />
    </div>
  );
};

export default Lobby;
