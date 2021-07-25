import { Action } from '../../models/events/action';

export enum ConnectionStateActionTypes {
  SetIsConnecting = 'SetIsConnecting',
  SetConnected = 'SetConnected'
}

export class SetConnected implements Action {
  readonly type = ConnectionStateActionTypes.SetConnected;
  constructor(public payload: boolean) {}
}

export class SetIsConnecting implements Action {
  readonly type = ConnectionStateActionTypes.SetIsConnecting;
  constructor(public payload: boolean) {}
}

export type ConnectionStateActions = SetConnected | SetIsConnecting;
