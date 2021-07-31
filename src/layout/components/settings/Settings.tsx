import React from 'react';
import Devices from '../devices/Devices';
import SettingsForm from './SettingsForm';

interface OwnProps {
  isVisible: boolean;
  subitPassword: (passwod: string) => void;
}

const Settings: React.FC<OwnProps> = ({ isVisible, subitPassword }) => {
  return isVisible ? (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Settings</h2>
        <div className="modal-content">
          <hr />
          <SettingsForm subitPassword={subitPassword} />
          <hr />
          <Devices />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Settings;
