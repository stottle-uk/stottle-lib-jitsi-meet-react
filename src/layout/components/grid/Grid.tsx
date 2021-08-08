import React from 'react';
import { useJitsiTracks } from '../../../conference/hooks/useJitsiTracks';
import GridFooter from './GridFooter';
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
  const { allTracks, participantsLength } = useJitsiTracks('ME!');

  return (
    <>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: getCols(participantsLength),
          gridTemplateRows: getRows(participantsLength)
        }}
      >
        {allTracks.map(
          user =>
            user.tracks.audio &&
            user.tracks.video && (
              <GridItem
                key={user.userId}
                className="grid-item"
                username={user.username}
                audio={user.tracks.audio}
                video={user.tracks.video}
              >
                <GridFooter
                  className="grid-footer"
                  username={user.username}
                  audio={user.tracks.audio}
                  video={user.tracks.video}
                  userId={user.userId}
                  displayUserActions={true}
                />
              </GridItem>
            )
        )}
      </div>
    </>
  );
};

export default Grid;
