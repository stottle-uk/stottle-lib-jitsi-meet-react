import React, { useEffect } from 'react';
import { useJitsiConference } from '../../conference/hooks/useJitsiConference';
import styles from './Conference.module.scss';
import Grid from './grid/Grid';
import Lobby from './Lobby';

const conferenceOptions = {
  enableLayerSuspension: true,
  p2p: {
    enabled: false
  }
};

interface OwnProps {
  // leaveConference: () => void;
}

const Conference: React.FC<OwnProps> = () => {
  const { isJoined, joinConference, leaveConference } = useJitsiConference({
    sessionId: `myTestRoomNameStuart1234`.toLowerCase(),
    username: `stuart`,
    conferenceOptions
  });

  useEffect(() => {
    // joinConference();

    return () => {
      // leaveConference();
      // dispose();
    };
  }, []);

  const renderBody = () => (
    <div className={styles.container}>
      <Grid />
    </div>
  );

  return isJoined ? renderBody() : <Lobby joinConference={joinConference} />;
};

export default Conference;
