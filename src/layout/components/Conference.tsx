import React from 'react';
import { useJitsiConference } from '../../conference/hooks/useJitsiConference';
import styles from './Conference.module.scss';
import Grid from './grid/Grid';
import Lobby from './Lobby';

interface OwnProps {
  // leaveConference: () => void;
}

const Conference: React.FC<OwnProps> = () => {
  const { isJoined, joinConference, leaveConference } = useJitsiConference();

  // useEffect(() => () => leaveConference(), [leaveConference]);

  const join = (username: string, password?: string) =>
    joinConference(username, password);

  const renderBody = () => (
    <div className={styles.container}>
      <Grid leaveConference={leaveConference} />
    </div>
  );

  return isJoined ? renderBody() : <Lobby joinConference={join} />;
};

export default Conference;
