import { JitsiParticipant } from '../JitsiParticipant';
import { JitsiTrack } from '../JitsiTrack';
import { Action } from './action';

export enum JitsiConferenceEventTypes {
  AudioLevelsChanged = 'conference.audioLevelsChanged',
  AuthStatusChanged = 'conference.auth_status_changed',
  BeforeStatisticsDisposed = 'conference.beforeStatisticsDisposed',
  Joined = 'conference.joined',
  Left = 'conference.left',
  kicked = 'conference.kicked',
  CreatedTimestamp = 'conference.createdTimestamp',
  PropertiesChanged = 'conference.propertiesChanged',
  RoleChange = 'conference.roleChanged',
  TrackAdded = 'conference.trackAdded',
  TrackMuteChanged = 'conference.trackMuteChanged',
  TrackRemoved = 'conference.trackRemoved',
  UserLeft = 'conference.userLeft',
  UserJoined = 'conference.userJoined',
  ConnectionEstablished = 'conference.connectionEstablished',
  ConferenceFailed = 'conference.failed'
}

export class AuthStatusChanged implements Action {
  readonly type = JitsiConferenceEventTypes.AuthStatusChanged;
  constructor(public payload: [boolean, string]) {}
}

export class ConferenceJoined implements Action {
  readonly type = JitsiConferenceEventTypes.Joined;
  constructor(
    public payload: {
      role: string;
      myUserId: string;
      roomname: string;
      isHidden: boolean;
    }
  ) {}
}

export class ConferenceLeft implements Action {
  readonly type = JitsiConferenceEventTypes.Left;
  constructor(public payload = null) {}
}

export class TrackRemoved implements Action {
  readonly type = JitsiConferenceEventTypes.TrackRemoved;
  constructor(public payload: JitsiTrack) {}
}

export class TrackAdded implements Action {
  readonly type = JitsiConferenceEventTypes.TrackAdded;
  constructor(public payload: JitsiTrack) {}
}

export class TrackMuteChanged implements Action {
  readonly type = JitsiConferenceEventTypes.TrackMuteChanged;
  constructor(public payload: JitsiTrack[] | JitsiTrack) {}
}

export class UserLeft implements Action {
  readonly type = JitsiConferenceEventTypes.UserLeft;
  constructor(public payload: [string, JitsiParticipant]) {}
}

export class UserKicked implements Action {
  readonly type = JitsiConferenceEventTypes.kicked;
  constructor(public payload: [JitsiParticipant, string]) {}
}

export class UserJoined implements Action {
  readonly type = JitsiConferenceEventTypes.UserJoined;
  constructor(public payload: [string, JitsiParticipant]) {}
}

export class SetCreatedTimestamp implements Action {
  readonly type = JitsiConferenceEventTypes.CreatedTimestamp;
  constructor(public payload: number) {}
}

export class ConnectionEstablished implements Action {
  readonly type = JitsiConferenceEventTypes.ConnectionEstablished;
  constructor(public payload: number) {}
}

export class AudioLevelsChanged implements Action {
  readonly type = JitsiConferenceEventTypes.AudioLevelsChanged;

  constructor(public payload: [string, number]) {}
}

export class ConferenceFailed implements Action {
  readonly type = JitsiConferenceEventTypes.ConferenceFailed;

  constructor(public payload: 'conference.passwordRequired') {}
}

export type JitsiConferenceEvents =
  | AuthStatusChanged
  | ConferenceJoined
  | ConferenceLeft
  | TrackAdded
  | TrackRemoved
  | TrackMuteChanged
  | UserLeft
  | UserKicked
  | SetCreatedTimestamp
  | UserJoined
  | ConnectionEstablished
  | AudioLevelsChanged
  | ConferenceFailed;
