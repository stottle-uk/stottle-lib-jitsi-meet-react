import React, { useRef } from 'react';
import { JitsiTrack } from '../../conference/models/JitsiTrack';

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
  const usernameEl = useRef<HTMLInputElement>(null);

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
        <input type="password" name="password" id="password" ref={usernameEl} />
        <button
          onClick={() =>
            usernameEl.current?.value &&
            subitPassword(usernameEl.current?.value)
          }
        >
          Set Password
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Settings;
