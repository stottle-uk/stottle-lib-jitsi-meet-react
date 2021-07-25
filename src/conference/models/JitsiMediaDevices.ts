import { JitsiDevicesEvents } from './events/mediaDevices';
import { JitsiEventEmitter } from './utils';

export interface JitsiMediaDevices
  extends JitsiEventEmitter<JitsiDevicesEvents> {
  isDeviceListAvailable: () => void;
  isDeviceChangeAvailable: (deviceType: DeviceType) => boolean;
  enumerateDevices: (callback: (devices: MediaDeviceInfo[]) => void) => void;
  setAudioOutputDevice: (deviceId: string) => void;
  getAudioOutputDevice: () => string;
  isDevicePermissionGranted: (
    type: 'audio' | 'video' | undefined
  ) => Promise<boolean>;
}

type DeviceType = 'input' | 'output' | undefined;
