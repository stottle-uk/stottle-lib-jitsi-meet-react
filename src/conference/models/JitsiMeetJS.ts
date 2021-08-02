import { JitsiConference } from './JitsiConference';
import { JitsiConnectionCtr } from './JitsiConnection';
import { JitsiMediaDevices } from './JitsiMediaDevices';
import { CreateTracksOptions, JitsiTrack } from './JitsiTrack';
import { LogLevels } from './utils';

declare global {
  interface Window {
    $: typeof jQuery;
    JitsiMeetJS: JitsiMeetJS;
  }
}

export type JitsiInitOptions = {
  useIPv6?: boolean;
  disableAudioLevels?: boolean;
  disableSimulcast?: boolean;
  enableWindowOnErrorHandler?: boolean;
  disableThirdPartyRequests?: boolean;
  enableAnalyticsLogging?: boolean;
  externalStorage?: typeof window.localStorage;
  callStatsCustomScriptUrl?: string;
  disableRtx?: boolean;
  disabledCodec?: string;
  preferredCodec?: string;
};

export interface JitsiMeetJS {
  version: string;
  conference: JitsiConference;
  JitsiConnection: JitsiConnectionCtr;
  ProxyConnectionService: any;
  constants: {
    participantConnectionStatus: any;
    recording: any;
    sipVideoGW: any;
    transcriptionStatus: any;
  };
  events: {
    conference: Record<string, string>;
    connection: Record<string, string>;
    detection: Record<string, string>;
    track: Record<string, string>;
    mediaDevices: Record<string, string>;
    connectionQuality: Record<string, string>;
    e2eping: Record<string, string>;
  };
  errors: {
    conference: Record<string, string>;
    connection: Record<string, string>;
    track: Record<string, string>;
  };
  errorTypes: {
    JitsiTrackError: any;
  };
  logLevels: LogLevels;
  mediaDevices: JitsiMediaDevices;
  analytics: any;
  init: (options?: JitsiInitOptions) => void;
  isDesktopSharingEnabled: () => boolean;
  isWebRtcSupported: () => boolean;
  setLogLevel: (level: string) => void;
  setLogLevelById: (level: any, id: any) => void;
  addGlobalLogTransport: (globalTransport: any) => void;
  removeGlobalLogTransport: (globalTransport: any) => void;
  setGlobalLogOptions: (options: any) => void;
  createLocalTracks: (options?: CreateTracksOptions) => Promise<JitsiTrack[]>;
  createTrackVADEmitter: (
    localAudioDeviceId: any,
    sampleRate: any,
    vadProcessor: any
  ) => any;
  createAudioMixer: () => any;
  getActiveAudioDevice: () => Promise<{
    deviceId: string;
    deviceLabel: string;
  }>;
  isDeviceListAvailable: () => Promise<boolean>;
  isDeviceChangeAvailable: (deviceType: string) => boolean;
  isMultipleAudioInputSupported: () => boolean;
  isCollectingLocalStats: () => boolean;
  enumerateDevices: (callback: Function) => void;
  getGlobalOnErrorHandler: (
    message: any,
    source: any,
    lineno: any,
    colno: any,
    error: any
  ) => any;
  setNetworkInfo: (isOnline: boolean) => void;
  setVideoTrackContentHints: (track: any, hint: string) => void;
  precallTest: any;
  util: {
    AuthUtil: any;
    ScriptUtil: any;
    browser: any;
  };
}
