import React, { useRef } from 'react';
import { useJitsiTracks } from '../../conference/hooks/useJitsiTracks';
import Devices from './Devices';

interface OwnProps {
  joinConference: (username: string) => void;
}

const Lobby: React.FC<OwnProps> = ({ joinConference }) => {
  const usernameInput = useRef<HTMLInputElement>(null);
  const { localTracks } = useJitsiTracks('Me');

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameInput} />

        <button
          onClick={() =>
            joinConference(usernameInput.current?.value || 'NOT KNOWN')
          }
        >
          JOIN
        </button>
      </div>

      <hr />

      {localTracks.audio && localTracks.video && (
        <Devices audio={localTracks.audio} video={localTracks.video} />
      )}
    </div>
  );
};

export default Lobby;
