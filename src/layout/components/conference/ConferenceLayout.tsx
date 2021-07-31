import React from 'react';
import Grid from '../grid/Grid';
import styles from './Conference.module.scss';

interface OwnProps {
  leaveConference: () => void;
}

const ConferenceLayout: React.FC<OwnProps> = ({ leaveConference }) => {
  return (
    <div className={styles.container}>
      <Grid leaveConference={leaveConference} />
    </div>
  );
};

export default ConferenceLayout;
