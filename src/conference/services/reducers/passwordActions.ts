import { Action } from '../../models/events/action';

export enum PasswordActionTypes {
  SetPasswordRequired = 'SetPasswordRequired'
}

export class SetPasswordRequired implements Action {
  readonly type = PasswordActionTypes.SetPasswordRequired;
  constructor(public payload: boolean) {}
}

export type PasswordStateActions = SetPasswordRequired;
