import React, { useRef } from 'react';
import Devices from '../devices/Devices';

interface OwnProps {
  isVisible: boolean;
  subitPassword: (passwod: string) => void;
}

const Settings: React.FC<OwnProps> = ({ isVisible, subitPassword }) => {
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
      <Devices />
    </div>
  ) : (
    <></>
  );
};

export default Settings;
