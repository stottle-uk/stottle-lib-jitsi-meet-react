import { JitsiConnectionEvents } from './events/connection';
import { JitsiConference, JitsiConferenceOptions } from './JitsiConference';
import { JitsiEventEmitter } from './utils';

export interface JitsiConnectionCtr {
  new (
    appId: string | null,
    token: string | null,
    options: JitsiConnectionOptions
  ): JitsiConnection;
}

export interface Hosts {
  domain: string;
  muc: string;
  anonymousdomain?: string;
}

export interface JitsiConnectionOptions {
  serviceUrl?: string;
  bosh?: string;
  hosts: Hosts;
  enableLipSync?: boolean;
  clientNode: string;
  xmppPing?: {
    interval: number;
    timeout: number;
    threshold: number;
  };
  websocketKeepAlive?: number;
  websocketKeepAliveUrl?: string;
}

export interface JitsiConnection
  extends JitsiEventEmitter<JitsiConnectionEvents> {
  connect(options?: { id?: string; password: string }): void;
  disconnect(): void;
  initJitsiConference(
    name: string,
    options: JitsiConferenceOptions
  ): JitsiConference;
  addFeature(...args: unknown[]): void;
  removeFeature(...args: unknown[]): void;
}
