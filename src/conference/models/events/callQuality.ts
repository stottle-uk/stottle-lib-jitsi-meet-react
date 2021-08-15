import { CallQualityLocal, CallQualityRemote } from '../jitsiCallQuality';
import { Action } from './action';

export enum JitsiCallQualityEventTypes {
  LocalStatsUpdated = 'cq.local_stats_updated',
  RemoteStatsUpdated = 'cq.remote_stats_updated'
}

export class LocalStatsUpdated implements Action {
  readonly type = JitsiCallQualityEventTypes.LocalStatsUpdated;
  constructor(public payload: CallQualityLocal) {}
}

export class RemoteStatsUpdated implements Action {
  readonly type = JitsiCallQualityEventTypes.RemoteStatsUpdated;
  constructor(public payload: [string, CallQualityRemote]) {}
}

export type JitsiCallQualityEvents = LocalStatsUpdated | RemoteStatsUpdated;
