import { Action } from '../../models/events/action';

export enum ConferenceStateActionTypes {
  SetCreatedTimestamp = 'setCreatedTimestamp',
  SetJoined = 'SetJoined',
  SetLeft = 'SetLeft',
  SetKicked = 'SetKicked',
  AuthStatusChanged = 'AuthStatusChanged'
}

export class SetCreatedTimestamp implements Action {
  readonly type = ConferenceStateActionTypes.SetCreatedTimestamp;
  constructor(public payload: number) {}
}

export class SetJoined implements Action {
  readonly type = ConferenceStateActionTypes.SetJoined;
  constructor(
    public payload: {
      role: string;
      myUserId: string;
      roomname: string;
      isHidden: boolean;
    }
  ) {}
}

export class SetLeft implements Action {
  readonly type = ConferenceStateActionTypes.SetLeft;
  constructor(public payload = null) {}
}

export class SetKicked implements Action {
  readonly type = ConferenceStateActionTypes.SetKicked;
  constructor(public payload = null) {}
}

export class AuthStatusChanged implements Action {
  readonly type = ConferenceStateActionTypes.AuthStatusChanged;
  constructor(
    public payload: {
      authEnabled: boolean;
      authIdentity: string;
    }
  ) {}
}

export type ConferenceStateActions =
  | SetCreatedTimestamp
  | SetJoined
  | SetLeft
  | SetKicked
  | AuthStatusChanged;
