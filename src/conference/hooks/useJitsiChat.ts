import { useObservableState } from 'observable-hooks';
import {
  chatInitialState,
  JitsiChatMessage
} from '../services/reducers/chatReducer';
import { useJitsiChatState } from './useJitsiMeet';

export const useJitsiChat = () => {
  const chat = useJitsiChatState();
  const chatState = useObservableState(chat.listen(), chatInitialState);

  const sendChatMessage = (message: JitsiChatMessage) => chat.send(message);

  return {
    chatMessages: chatState.messages,
    sendChatMessage
  };
};
