import React from 'react';
import { JitsiChatMessage } from '../../conference/services/reducers/chatReducer';
import styles from './ChatMessage.module.scss';

interface Props {
  msg: JitsiChatMessage;
  isSelf: boolean;
  prevAuthorId: number | undefined;
}

function ChatMessage({ msg, isSelf, prevAuthorId }: Props) {
  const sameAuthor = prevAuthorId === msg.authorId;

  return (
    <div
      className={`${styles.container} ${sameAuthor && styles.sameAuthor} ${
        isSelf && styles.self
      }`}
    >
      {!sameAuthor && <p className={styles.author}>{msg.authorName}</p>}
      <p className={styles.message}>{msg.message}</p>
    </div>
  );
}

export default ChatMessage;
