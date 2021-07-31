import React from 'react';
import Grid from '../grid/Grid';
import Toolbar from '../toolbar/Toolbar';
import styles from './Conference.module.scss';

interface OwnProps {
  leaveConference: () => void;
}

const ConferenceLayout: React.FC<OwnProps> = ({ leaveConference }) => {
  return (
    <div className={styles.container}>
      <Grid />
      <Toolbar />
    </div>
  );
};

export default ConferenceLayout;
