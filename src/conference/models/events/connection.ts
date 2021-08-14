import { Action } from './action';

export enum JitsiConnectionEventTypes {
  ConnectionEstablished = 'connection.connectionEstablished',
  ConnectionDisconnected = 'connection.connectionDisconnected'
}

export class ConnectionEstablished implements Action {
  readonly type = JitsiConnectionEventTypes.ConnectionEstablished;
  constructor(public payload = null) {}
}

export class ConnectionDisconnected implements Action {
  readonly type = JitsiConnectionEventTypes.ConnectionDisconnected;
  constructor(public payload = null) {}
}

export type JitsiConnectionEvents =
  | ConnectionEstablished
  | ConnectionDisconnected;
