import React, { useRef } from 'react';
import { JitsiTrack } from '../../conference/models/JitsiTrack';
import Devices from './Devices';

interface OwnProps {
  isVisible: boolean;
  audio: JitsiTrack;
  video: JitsiTrack;
  subitPassword: (passwod: string) => void;
}

const Settings: React.FC<OwnProps> = ({
  isVisible,
  audio,
  video,
  subitPassword
}) => {
  const passwordEl = useRef<HTMLInputElement>(null);

  return isVisible ? (
    <div
      style={{
        position: 'absolute',
        top: '25%',
        bottom: '25%',
        left: '25%',
        right: '25%',
        backgroundColor: '#ccc'
      }}
    >
      Settings
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={passwordEl} />
        <button
          onClick={() =>
            passwordEl.current?.value &&
            subitPassword(passwordEl.current?.value)
          }
        >
          Set Password
        </button>
      </div>
      <Devices audio={audio} video={video} />
    </div>
  ) : (
    <></>
  );
};

export default Settings;
