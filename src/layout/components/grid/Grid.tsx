import React from 'react';
import { useJitsiActions } from '../../../conference/hooks/useJitsiActions';
import { useJitsiTracks } from '../../../conference/hooks/useJitsiTracks';
import GridItem from './GridItem';

const getCols = (len: number): string => {
  if (len <= 2) {
    return `repeat(${len}, 1fr)`;
  }
  if (len <= 4) {
    return `repeat(2, 1fr)`;
  }
  if (len <= 9) {
    return `repeat(3, 1fr)`;
  }
  return `repeat(4, 1fr)`;
};

const getRows = (len: number): string => {
  if (len <= 2) {
    return '1fr';
  }
  if (len <= 4) {
    return '1fr 1fr';
  }
  if (len <= 6) {
    return '1fr 1fr';
  }
  if (len <= 12) {
    return '1fr 1fr 1fr';
  }
  return `repeat(4, 1fr)`;
};

const Grid: React.FC = () => {
  const { kickParticipant, muteParticipant } = useJitsiActions();
  const { allTracks } = useJitsiTracks('ME!');

  const userAction = (userId: string, action: string) => {
    if (action === 'kick') {
      kickParticipant(userId);
    }
    if (action === 'muteVideo') {
      muteParticipant(userId, 'video');
    }
    if (action === 'muteAudio') {
      muteParticipant(userId, 'audio');
    }
  };

  const participantsLength = Object.keys(allTracks).length;

  return (
    <>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: getCols(participantsLength),
          gridTemplateRows: getRows(participantsLength)
        }}
      >
        {Object.entries(allTracks).map(([id, tracksInner]) => (
          <GridItem
            key={id}
            userId={id}
            className="grid-item"
            displayUserActions={false}
            userAction={userAction}
            username={tracksInner.username}
            tracks={tracksInner.tracks}
            participantsLength={participantsLength}
          />
        ))}
      </div>
    </>
  );
};

export default Grid;
