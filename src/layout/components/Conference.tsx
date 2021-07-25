import React, { useEffect } from 'react';
import { useJitsiConference } from '../../conference/hooks/useJitsiConference';
import styles from './Conference.module.scss';
import Grid from './grid/Grid';
import Lobby from './Lobby';

interface OwnProps {
  // leaveConference: () => void;
}

const Conference: React.FC<OwnProps> = () => {
  const { isJoined, joinConference, leaveConference } = useJitsiConference();

  useEffect(() => {
    // joinConference();

    return () => {
      // leaveConference();
      // dispose();
    };
  }, []);

  const join = (username: string) => joinConference(username);

  const renderBody = () => (
    <div className={styles.container}>
      <Grid />
    </div>
  );

  return isJoined ? renderBody() : <Lobby joinConference={join} />;
};

export default Conference;
