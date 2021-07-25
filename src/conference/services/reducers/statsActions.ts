import { Action } from '../../models/events/action';

export enum StatsActionTypes {
  UpdateUserAudioLevel = 'UpdateUserAudioLevel'
}

export class UpdateUserAudioLevel implements Action {
  readonly type = StatsActionTypes.UpdateUserAudioLevel;

  constructor(public payload: { userId: string; level: number }) {}
}

export type StatsStateActions = UpdateUserAudioLevel;
