import React from 'react';
import styles from './DeviceOption.module.scss';

interface OwnProps {
  device: MediaDeviceInfo;
  isActive: boolean;
  setActive: (id: string) => void;
}

const DeviceOptions: React.FC<OwnProps> = ({ device, isActive, setActive }) => {
  const onClick = () => setActive(device.deviceId);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.dot} ${isActive && styles.active}`}></div>
      <p>{device.label}</p>
    </div>
  );
};

export default DeviceOptions;
