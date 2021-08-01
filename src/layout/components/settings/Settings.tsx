import React from 'react';
import Devices from '../devices/Devices';
import SettingsForm from './SettingsForm';

interface OwnProps {
  isVisible: boolean;
  subitPassword: (passwod: string) => void;
  onClose: () => void;
}

const Settings: React.FC<OwnProps> = ({
  isVisible,
  subitPassword,
  onClose
}) => {
  return isVisible ? (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Settings</h2>
          <div>
            <button onClick={() => onClose()}>X</button>
          </div>
        </div>
        <div className="modal-content">
          <SettingsForm subitPassword={subitPassword} />
          <Devices />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Settings;
