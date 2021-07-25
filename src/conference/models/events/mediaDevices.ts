import { Action } from './action';

export enum JitsiDevicesEventTypes {
  deviceListChanged = 'mediaDevices.devicechange',
  permissionPromptIsShow = 'mediaDevices.permissionPromptIsShow'
}

export class DeviceListChanged implements Action {
  readonly type = JitsiDevicesEventTypes.deviceListChanged;
  constructor(public payload: MediaDeviceInfo[]) {}
}

export class PermissionPromptIsShow implements Action {
  readonly type = JitsiDevicesEventTypes.permissionPromptIsShow;
  constructor(public payload = null) {}
}

export type JitsiDevicesEvents = DeviceListChanged | PermissionPromptIsShow;
