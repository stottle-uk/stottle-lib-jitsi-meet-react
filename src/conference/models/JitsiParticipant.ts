import { JitsiTrack } from './JitsiTrack';

export interface JitsiParticipant {
  getDisplayName(): string;
  getId(): string;
  getTracks(): JitsiTrack[];
  getConnectionStatus(): string;
}
