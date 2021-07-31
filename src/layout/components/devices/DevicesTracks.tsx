import React from 'react';
import { useJitsiTracks } from '../../../conference/hooks/useJitsiTracks';
import DevicesTracksInner from './DevicesTracksInner';

const DevicesTracks: React.FC = () => {
  const { localTracks } = useJitsiTracks('ME');

  return (
    <>
      {localTracks.audio && localTracks.video && (
        <DevicesTracksInner
          video={localTracks.video}
          audio={localTracks.audio}
        />
      )}
    </>
  );
};

export default DevicesTracks;
