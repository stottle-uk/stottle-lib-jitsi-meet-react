import React from 'react';
import Grid from '../grid/Grid';
import Toolbar from '../toolbar/Toolbar';

const ConferenceLayout: React.FC = () => {
  return (
    <div className="container">
      <Grid />
      <Toolbar />
    </div>
  );
};

export default ConferenceLayout;
