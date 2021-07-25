import { Action } from '../../models/events/action';

export enum DevicesStateActionTypes {
  AddDevices = 'AddDevices',
  SetAudioOutDevice = 'SetAudioOutDevice'
}

export class AddDevices implements Action {
  readonly type = DevicesStateActionTypes.AddDevices;
  constructor(public payload: MediaDeviceInfo[]) {}
}

export class SetAudioOutDevice implements Action {
  readonly type = DevicesStateActionTypes.SetAudioOutDevice;
  constructor(public payload: string) {}
}

export type DevicesStateActions = AddDevices | SetAudioOutDevice;
