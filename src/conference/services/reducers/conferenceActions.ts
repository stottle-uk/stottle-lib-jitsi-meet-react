import { Action } from '../../models/events/action';

export enum ConferenceStateActionTypes {
  SetUserData = 'SetUserData',
  SetCreatedTimestamp = 'setCreatedTimestamp',
  SetJoined = 'SetJoined',
  SetKicked = 'SetKicked'
}

export class SetUserData implements Action {
  readonly type = ConferenceStateActionTypes.SetUserData;
  constructor(
    public payload: {
      role: string;
      myUserId: string;
      roomname: string;
      isHidden: boolean;
    }
  ) {}
}

export class SetJoined implements Action {
  readonly type = ConferenceStateActionTypes.SetJoined;
  constructor(public payload: boolean) {}
}

export class SetKicked implements Action {
  readonly type = ConferenceStateActionTypes.SetKicked;
  constructor(public payload = null) {}
}

export class SetCreatedTimestamp implements Action {
  readonly type = ConferenceStateActionTypes.SetCreatedTimestamp;
  constructor(public payload: number) {}
}

export type ConferenceStateActions =
  | SetUserData
  | SetCreatedTimestamp
  | SetJoined
  | SetKicked;
