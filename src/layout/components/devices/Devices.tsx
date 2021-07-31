import React from 'react';
import { useJitsiDevices } from '../../../conference/hooks/useJitsiDevices';
import { useJitsiTracks } from '../../../conference/hooks/useJitsiTracks';
import DevicesInner from './DevicesInner';

const Devices: React.FC = () => {
  const {
    replaceDevice,
    setAudioOutDevice,
    videoInDevices,
    audioInDevices,
    audioOutDevices,
    audioOutId
  } = useJitsiDevices();
  const { localTracks } = useJitsiTracks('ME');

  return (
    <>
      {localTracks.audio && localTracks.video && (
        <DevicesInner
          video={localTracks.video}
          audio={localTracks.audio}
          replaceDevice={replaceDevice}
          setAudioOutDevice={setAudioOutDevice}
          videoInDevices={videoInDevices}
          audioInDevices={audioInDevices}
          audioOutDevices={audioOutDevices}
          audioOutId={audioOutId}
        />
      )}
    </>
  );
};

export default Devices;
