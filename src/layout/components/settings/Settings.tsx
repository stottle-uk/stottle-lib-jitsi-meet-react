import React from 'react';
import Devices from '../devices/Devices';
import SettingsForm from './SettingsForm';

interface OwnProps {
  isVisible: boolean;
  subitPassword: (passwod: string) => void;
}

const Settings: React.FC<OwnProps> = ({ isVisible, subitPassword }) => {
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
      <h2>Settings</h2>
      <hr />
      <SettingsForm subitPassword={subitPassword} />
      <hr />
      <Devices />
    </div>
  ) : (
    <></>
  );
};

export default Settings;
