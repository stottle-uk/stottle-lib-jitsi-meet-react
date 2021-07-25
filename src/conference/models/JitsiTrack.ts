import { JitsiEventEmitter, TrackType } from './utils';

export interface CreateTracksOptions {
  devices?: string[];
  resolution?: any;
  constraints?: any;
  cameraDeviceId?: string;
  micDeviceId?: string;
  minFps?: number;
  maxFps?: number;
  facingMode?: 'user' | 'environment';
  firePermissionPromptIsShownEvent?: boolean;
  fireSlowPromiseEvent?: boolean;
  desktopSharingSourceDevice?: string;
  desktopSharingFrameRate?: {
    min: number;
    max: number;
  };
}

export interface JitsiTrack extends JitsiEventEmitter<JitsiTrack> {
  type: TrackType;
  addFeature: Function;
  removeFeature: Function;
  isLocal(): boolean;
  getType(): this['type'];
  mute(): Promise<void>;
  unmute(): Promise<void>;
  isMuted(): boolean;
  attach(container: HTMLElement): void;
  dettach(container: any): void;
  dispose(): Promise<any>;
  getId(): string;
  getParticipantId(): string;
  setAudioOutput(audioOutputDeviceId: string): void;
  getDeviceId(): string;
  isEnded(): boolean;
  setEffect(effect: any): void;
}
