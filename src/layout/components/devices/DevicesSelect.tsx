import React from 'react';

interface OwnProps {
  label: string;
  devices: MediaDeviceInfo[];
  onSelect: (deviceId: string) => void;
}

const DevicesSelect: React.FC<OwnProps> = ({ label, devices, onSelect }) => {
  return (
    <div className="form-field">
      <label htmlFor="">{label}</label>
      <select onChange={d => d.target.value && onSelect(d.target.value)}>
        {devices.map(d => (
          <option key={d.deviceId} value={d.deviceId}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DevicesSelect;
