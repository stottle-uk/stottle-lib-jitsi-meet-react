import React from 'react';
import Grid from '../grid/Grid';
import Toolbar from '../toolbar/Toolbar';

interface OwnProps {
  leaveConference: () => void;
}

const ConferenceLayout: React.FC<OwnProps> = ({ leaveConference }) => {
  return (
    <div className="container">
      <Grid />
      <Toolbar />
    </div>
  );
};

export default ConferenceLayout;
