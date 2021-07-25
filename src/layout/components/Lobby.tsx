import React from 'react';
import { useJitsiDevices } from '../../conference/hooks/useJitsiDevices';
import { useJitsiTracks } from '../../conference/hooks/useJitsiTracks';
import Devices from './Devices';

interface OwnProps {
  joinConference: () => void;
}

const Lobby: React.FC<OwnProps> = ({ joinConference }) => {
  const { replaceDevice } = useJitsiDevices();
  const { localTracks } = useJitsiTracks('Me');

  console.log(localTracks);

  return (
    <div>
      <button onClick={joinConference}>JOIN</button>

      {localTracks.audio && localTracks.video && (
        <Devices audio={localTracks.audio} video={localTracks.video} />
      )}
    </div>
  );
};

export default Lobby;
