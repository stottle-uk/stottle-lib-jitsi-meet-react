import { Action } from './action';

export const {
  TRACK_MUTE_CHANGED,
  LOCAL_TRACK_STOPPED
} = window.JitsiMeetJS.events.track;

export enum JitsiTrackEventTypes {
  trackAudioOuputChanged = 'track.audioOutputChanged'
}

export class TrackAudioOutputChanged implements Action {
  readonly type = JitsiTrackEventTypes.trackAudioOuputChanged;
  constructor(public payload: string) {} // new device id
}

export type JitsiTrackEvents = TrackAudioOutputChanged;
