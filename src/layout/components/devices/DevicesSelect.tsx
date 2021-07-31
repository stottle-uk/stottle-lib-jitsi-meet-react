import React from 'react';

interface OwnProps {
  label: string;
  devices: MediaDeviceInfo[];
  onSelect: (media: MediaDeviceInfo) => void;
}

const DevicesSelect: React.FC<OwnProps> = ({ label, devices, onSelect }) => {
  return (
    <div className="form-field">
      <label htmlFor="">{label}</label>
      <select>
        {devices.map(d => (
          <option key={d.deviceId} onClick={() => onSelect(d)}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DevicesSelect;
