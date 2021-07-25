import { Action } from '../../models/events/action';
import { JitsiChatMessage } from './chatReducer';

export enum ChatActionTypes {
  SetChatMessages = 'SetChatMessage'
}

export class SetChatMessages implements Action {
  readonly type = ChatActionTypes.SetChatMessages;
  constructor(public payload: JitsiChatMessage) {}
}

export type ChatStateActions = SetChatMessages;
