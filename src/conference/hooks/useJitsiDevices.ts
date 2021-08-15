import { useObservableState } from 'observable-hooks';
import { CreateTracksOptions, JitsiTrack } from '../models/JitsiTrack';
import { devicesInitialState } from '../services/reducers/devicesReducer';
import { useJitsiDevicesState } from './useJitsiMeet';

export const useJitsiDevices = () => {
  const jitsiDevices = useJitsiDevicesState();
  const devicesState = useObservableState(
    jitsiDevices.state$,
    devicesInitialState
  );

  const setAudioOutDevice = (deviceId: string) =>
    jitsiDevices.setAudioOutDevice(deviceId);

  const replaceDevice = (oldTrack: JitsiTrack, options: CreateTracksOptions) =>
    jitsiDevices.replaceTrack(oldTrack, options);

  const filterDevices = (filter: MediaDeviceKind) =>
    devicesState.devices.filter(d => d.kind === filter);

  return {
    audioInDevices: filterDevices('audioinput'),
    audioOutDevices: filterDevices('audiooutput'),
    videoInDevices: filterDevices('videoinput'),
    audioOutId: devicesState.audioOutId,
    replaceDevice,
    setAudioOutDevice
  };
};
