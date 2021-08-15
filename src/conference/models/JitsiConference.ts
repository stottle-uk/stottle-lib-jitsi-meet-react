import { JitsiConferenceEvents } from './events/conference';
import { JitsiParticipant } from './JitsiParticipant';
import { JitsiTrack } from './JitsiTrack';
import { JitsiCommandValues, JitsiEventEmitter } from './utils';

export interface JitsiConferenceOptions {
  openBridgeChannel?: boolean;
  startAudioMuted?: boolean;
  startVideoMuted?: boolean;
  enableLayerSuspension: boolean;
  p2p?: {
    enabled: boolean;
    stunServers?: string;
    backToP2PDelay?: number;
    disabledCodec?: string;
    preferredCodec?: string;
    // preferH264: boolean,
    // disableH264: boolean,
  };
}

export interface JitsiConference
  extends JitsiEventEmitter<JitsiConferenceEvents> {
  join(password?: string, replaceParticipant?: boolean): void;
  leave(): Promise<void>;
  myUserId(): string;
  getLocalTracks(): JitsiTrack[];
  sendTextMessage(text: string): void;
  setDisplayName(name: string): void;
  selectParticipant(participantId: string): void;
  sendCommand(name: string, values: any): void;
  sendCommandOnce: this['sendCommand'];
  removeCommand(name: string): void;
  addCommandListener(
    command: string,
    handler: (values: JitsiCommandValues) => void
  ): void;
  removeCommandListener(command: string): void;
  addTrack(track: JitsiTrack): Promise<void>;
  replaceTrack(oldTrack: JitsiTrack, newTrack: JitsiTrack): void;
  removeTrack(track: JitsiTrack): Promise<void>;
  isDTMFSupported(): boolean;
  getRole(): 'moderator' | 'none' | string;
  isModerator(): boolean;
  lock(password: string): Promise<void>;
  unlock(): Promise<void>;
  kickParticipant(id: string, reason: string): void;
  muteParticipant(id: string, reason: string): void;
  setStartMutedPolicy(policy: { video: boolean; audio: boolean }): void;
  getStartMutedPolicy(): { video: boolean; audio: boolean };
  isStartAudioMuted(): boolean;
  isStartVideoMuted(): boolean;
  sendFeedback(overallFeedback: unknown, detailedFeedback: unknown): void;
  setSubject(subject: string): void;
  sendEndpointMessage(to: string, payload: unknown): void;
  broadcastEndpointMessage(payload: unknown): void;
  pinParticipant(participantId: string): void;
  setReceiverVideoConstraint(resolution: number): void;
  setSenderVideoConstraint(resolution: number): void;
  isHidden(): boolean;
  getParticipants(): JitsiParticipant[];
  getName(): string;
}
