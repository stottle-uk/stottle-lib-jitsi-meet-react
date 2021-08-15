import { JitsiConferenceEventTypes } from '../models/events/conference';
import { JitsiConnectionEventTypes } from '../models/events/connection';
import {
  JitsiDevicesEvents,
  JitsiDevicesEventTypes
} from '../models/events/mediaDevices';
import {
  JitsiConference,
  JitsiConferenceOptions
} from '../models/JitsiConference';
import {
  JitsiConnection,
  JitsiConnectionOptions
} from '../models/JitsiConnection';
import { JitsiMediaDevices } from '../models/JitsiMediaDevices';
import { JitsiMeetJS } from '../models/JitsiMeetJS';
import { JitsiParticipant } from '../models/JitsiParticipant';
import { JitsiTrack } from '../models/JitsiTrack';

export const connectOptions: JitsiConnectionOptions = {
  clientNode: '',
  hosts: { domain: '', muc: '' }
};

export const conferenceOptions: JitsiConferenceOptions = {
  enableLayerSuspension: true
};

export const trackMock = {
  type: 'audio'
} as JitsiTrack;

export const deviceMock = {
  deviceId: 'd123',
  groupId: 'g123',
  kind: 'audioinput',
  label: 'deviceLabel'
} as MediaDeviceInfo;

export const localUserMock = {
  isHidden: false,
  myUserId: 'myUserId1',
  role: 'moderator',
  roomname: 'roomNameTest'
};

export const participantMock = {
  userId: 'partId1',
  getTracks: () => [trackMock, trackMock]
} as unknown as JitsiParticipant;

export class ConferenceMock implements JitsiConference {
  getLocalTracks(): JitsiTrack[] {
    return [trackMock];
  }
  sendTextMessage(text: string): void {}
  selectParticipant(participantId: string): void {}
  removeCommand(name: string): void {}
  removeCommandListener(command: string): void {}
  removeTrack(track: JitsiTrack): Promise<void> {
    return Promise.resolve();
  }
  isDTMFSupported(): boolean {
    return true;
  }
  isModerator(): boolean {
    return true;
  }
  unlock(): Promise<void> {
    return Promise.resolve();
  }
  setStartMutedPolicy(policy: { video: boolean; audio: boolean }): void {}
  getStartMutedPolicy(): { video: boolean; audio: boolean } {
    return { video: true, audio: true };
  }
  isStartAudioMuted(): boolean {
    return true;
  }
  isStartVideoMuted(): boolean {
    return true;
  }
  sendFeedback(overallFeedback: unknown, detailedFeedback: unknown): void {}
  setSubject(subject: string): void {}
  sendEndpointMessage(to: string, payload: unknown): void {}
  broadcastEndpointMessage(payload: unknown): void {}
  pinParticipant(participantId: string): void {}
  setReceiverVideoConstraint(resolution: number): void {}
  setSenderVideoConstraint(resolution: number): void {}
  setDisplayName() {}
  join() {}
  leave() {
    return Promise.resolve();
  }
  addTrack() {
    return Promise.resolve();
  }
  replaceTrack() {}
  lock() {
    return Promise.resolve();
  }
  kickParticipant() {}
  muteParticipant() {}
  sendCommand() {}
  sendCommandOnce() {}
  getParticipants() {
    return [participantMock, participantMock];
  }
  addCommandListener(commandType: string, fn: Function) {}
  addEventListener(type: string, listener: Function) {}
  removeEventListener() {}
  getRole() {
    return localUserMock.role;
  }
  myUserId() {
    return localUserMock.myUserId;
  }
  isHidden() {
    return localUserMock.isHidden;
  }
  getName() {
    return localUserMock.roomname;
  }
}

export class ConnectionMock implements JitsiConnection {
  addFeature(...args: unknown[]): void {}
  removeFeature(...args: unknown[]): void {}
  connect() {}
  disconnect() {}
  initJitsiConference(r: string, o: unknown) {
    return new ConferenceMock();
  }
  addEventListener(type: string, listener: Function): void {}
  removeEventListener(): void {}
}

export class MediaDevicesMock implements JitsiMediaDevices {
  isDeviceListAvailable(): void {}
  isDeviceChangeAvailable(deviceType: 'input' | 'output' | undefined): boolean {
    return true;
  }
  enumerateDevices(callback: (devices: MediaDeviceInfo[]) => void): void {
    callback([deviceMock, deviceMock]);
  }
  setAudioOutputDevice(deviceId: string): void {}
  getAudioOutputDevice(): string {
    return deviceMock.deviceId;
  }
  isDevicePermissionGranted(
    type: 'audio' | 'video' | undefined
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
  addEventListener(
    type: string,
    listener: (evt: JitsiDevicesEvents) => void
  ): void {}
  removeEventListener(
    type: string,
    listener: (evt: JitsiDevicesEvents) => void
  ): void {}
}

export const JitsiMeetJSMock = {
  JitsiConnection: ConnectionMock,
  events: {
    connection: {
      CONNECTION_ESTABLISHED: JitsiConnectionEventTypes.ConnectionEstablished
    },
    conference: {
      JOINED: JitsiConferenceEventTypes.Joined,
      LEFT: JitsiConferenceEventTypes.Left
    },
    mediaDevices: {
      DEVICE_CHANGE: JitsiDevicesEventTypes.deviceListChanged
    }
  },
  errors: {},
  createLocalTracks: () => Promise.resolve([trackMock, trackMock]),
  mediaDevices: new MediaDevicesMock()
} as unknown as JitsiMeetJS;
