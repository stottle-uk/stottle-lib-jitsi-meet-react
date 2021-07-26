import React, { useRef } from 'react';
import { useJitsiPassword } from '../../conference/hooks/useJitsiPassword';
import { useJitsiTracks } from '../../conference/hooks/useJitsiTracks';
import Devices from './Devices';

interface OwnProps {
  joinConference: (username: string, password?: string) => void;
}

const Lobby: React.FC<OwnProps> = ({ joinConference }) => {
  const usernameEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);
  const { localTracks } = useJitsiTracks('Me');
  const { passwordRequired } = useJitsiPassword();

  console.log(passwordRequired);

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameEl} />
        {passwordRequired && (
          <input type="text" id="password" ref={passwordEl} />
        )}

        <button
          onClick={() =>
            joinConference(
              usernameEl.current?.value || 'NOT KNOWN',
              passwordEl.current?.value || 'NOT KNOWN'
            )
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
