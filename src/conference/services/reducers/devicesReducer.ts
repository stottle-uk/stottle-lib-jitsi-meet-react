import { DevicesStateActions, DevicesStateActionTypes } from './devicesActions';

export interface DevicesState {
  devices: MediaDeviceInfo[];
  audioOutId: string;
}

export const devicesInitialState: DevicesState = {
  devices: [],
  audioOutId: ''
};

export const devicesReducer = (
  state = devicesInitialState,
  action: DevicesStateActions
): DevicesState => {
  switch (action.type) {
    case DevicesStateActionTypes.AddDevices:
      return {
        ...state,
        devices: action.payload,
        audioOutId:
          action.payload.find(
            g => g.kind === 'audiooutput' && g.deviceId === 'default'
          )?.deviceId || ''
      };

    case DevicesStateActionTypes.SetAudioOutDevice:
      return {
        ...state,
        audioOutId: action.payload
      };

    default:
      return state;
  }
};
