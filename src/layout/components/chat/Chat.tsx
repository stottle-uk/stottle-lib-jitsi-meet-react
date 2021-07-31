import React from 'react';
import { JitsiChatMessage } from '../../../conference/services/reducers/chatReducer';
import iconChatBox from '../assets/icons/icon_chat_box.svg';
import styles from './Chat.module.scss';
import ChatMessage from './ChatMessage';

interface Props {
  messages: JitsiChatMessage[];

  hideChat: () => void;
  send: (msg: JitsiChatMessage) => void;
}

function Chat({ messages, hideChat, send }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [msg, setMsg] = React.useState<string>('');

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages.length]);

  const onChange = (e: any) => {
    e.preventDefault();
    setMsg(e.target.value);
  };

  const onKeyUp = (e: any) => {
    e.preventDefault();

    const m = msg.trim();
    if (!m) return;

    if (e.keyCode === 13) {
      send({
        authorId: 123,
        authorName: 'userName',
        message: m
      });
      setMsg('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={iconChatBox} alt="chat-logo" />
          <h3>Chat box</h3>
        </div>
        <div className={styles.headerHide} onClick={hideChat}>
          <p>&#x2715;</p>
        </div>
      </div>

      <div className={styles.messagesContainer} ref={containerRef}>
        {messages.map((m, idx) => {
          const prevAuthorId = idx > 0 && messages[idx - 1].authorId;
          return (
            <ChatMessage
              key={`${m.authorId}_${idx}`}
              msg={m}
              isSelf={m.authorId === 123}
              prevAuthorId={prevAuthorId || undefined}
            />
          );
        })}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          value={msg}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder="Type your message here"
        ></input>
      </div>
    </div>
  );
}

export default Chat;
