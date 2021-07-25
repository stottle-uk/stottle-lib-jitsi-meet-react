import { ChatActionTypes, ChatStateActions } from './chatActions';

export interface JitsiChatMessage {
  authorId: number;
  authorName: string;
  message: string;
}

export interface ChatState {
  messages: JitsiChatMessage[];
}

export const chatInitialState: ChatState = {
  messages: []
};

export const chatReducer = (
  state = chatInitialState,
  action: ChatStateActions
): ChatState => {
  switch (action.type) {
    case ChatActionTypes.SetChatMessages:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    default:
      return state;
  }
};
