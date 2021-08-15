import { Action } from '../../models/events/action';
import {
  CallQualityLocal,
  CallQualityRemote
} from '../../models/jitsiCallQuality';

export enum CallQualityStateActionTypes {
  RemoteStatsUpdated = 'RemoteStatsUpdated',
  LocalStatsUpdated = 'LocalStatsUpdated'
}

export class RemoteStatsUpdated implements Action {
  readonly type = CallQualityStateActionTypes.RemoteStatsUpdated;
  constructor(
    public payload: {
      userId: string;
      stats: CallQualityRemote;
    }
  ) {}
}

export class LocalStatsUpdated implements Action {
  readonly type = CallQualityStateActionTypes.LocalStatsUpdated;
  constructor(public payload: CallQualityLocal) {}
}

export type CallQualityStateActions = RemoteStatsUpdated | LocalStatsUpdated;
