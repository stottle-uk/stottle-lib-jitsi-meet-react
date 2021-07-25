import { useEffect, useState } from 'react';
import {
  chatInitialState,
  ChatState,
  JitsiChatMessage
} from '../services/reducers/chatReducer';
import { useJitsiChatState } from './useJitsiMeet';

export const useJitsiChat = () => {
  const chat = useJitsiChatState();
  const [chatState, setChatState] = useState<ChatState>(chatInitialState);

  useEffect(() => {
    const sub = chat.listen().subscribe(state => setChatState(state));

    return () => {
      sub.unsubscribe();
    };
  }, [chat]);

  const sendChatMessage = (message: JitsiChatMessage) => chat.send(message);

  return {
    chatMessages: chatState.messages,
    sendChatMessage
  };
};
