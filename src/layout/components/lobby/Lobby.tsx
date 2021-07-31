import React from 'react';
import { useJitsiTracks } from '../../../conference/hooks/useJitsiTracks';
import Devices from '../Devices';
import LobbyForm from './LobbyForm';

interface OwnProps {
  joinConference: (username: string, password?: string) => void;
}

const Lobby: React.FC<OwnProps> = ({ joinConference }) => {
  const { localTracks } = useJitsiTracks('Me');

  return (
    <>
      <LobbyForm joinConference={joinConference} />

      <hr />

      {localTracks.audio && localTracks.video && (
        <Devices audio={localTracks.audio} video={localTracks.video} />
      )}
    </>
  );
};

export default Lobby;
