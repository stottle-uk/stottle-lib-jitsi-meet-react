import { Action } from '../../models/events/action';
import { JitsiParticipant } from '../../models/JitsiParticipant';

export enum UsersStateActionTypes {
  AddUser = 'AddUser',
  RemoveUser = 'RemoveUser'
}

export class AddUser implements Action {
  readonly type = UsersStateActionTypes.AddUser;
  constructor(public payload: { userId: string; user: JitsiParticipant }) {}
}

export class RemoveUser implements Action {
  readonly type = UsersStateActionTypes.RemoveUser;
  constructor(public payload: string) {}
}

export type UsersStateActions = AddUser | RemoveUser;
