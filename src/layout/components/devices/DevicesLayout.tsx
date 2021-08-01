import React from 'react';
import {
  CreateTracksOptions,
  JitsiTrack
} from '../../../conference/models/JitsiTrack';
import DevicesSelect from './DevicesSelect';
import DevicesTracks from './DevicesTracks';

interface OwnProps {
  videoInDevices: MediaDeviceInfo[];
  audioInDevices: MediaDeviceInfo[];
  audioOutDevices: MediaDeviceInfo[];
  audioOutId: string;
  audio: JitsiTrack;
  video: JitsiTrack;
  replaceDevice: (oldTrack: JitsiTrack, options: CreateTracksOptions) => void;
  setAudioOutDevice: (deviceId: string) => void;
}

const DevicesLayout: React.FC<OwnProps> = ({
  replaceDevice,
  setAudioOutDevice,
  videoInDevices,
  audioInDevices,
  audioOutDevices,
  audioOutId,
  audio,
  video
}) => {
  const playTestSound = () => {
    // todo - make this work!
    const beepLong = new Audio('./assets/sound-go.wav');
    beepLong.play();
  };

  // https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
  return (
    <div>
      <button onClick={() => playTestSound()}>TEST SOUND</button>

      <div>
        <DevicesSelect
          label="Audio Out"
          devices={audioOutDevices}
          selectedDeviceId={audioOutId}
          onSelect={deviceId => setAudioOutDevice(deviceId)}
        />
      </div>
      <div>
        <DevicesSelect
          label="Audio In"
          devices={audioInDevices}
          selectedDeviceId={audio.getDeviceId()}
          onSelect={deviceId =>
            replaceDevice(audio, {
              devices: ['audio'],
              micDeviceId: deviceId
            })
          }
        />
      </div>
      <div>
        <DevicesSelect
          label="Video"
          devices={videoInDevices}
          selectedDeviceId={video.getDeviceId()}
          onSelect={deviceId =>
            replaceDevice(video, {
              devices: ['video'],
              micDeviceId: deviceId
            })
          }
        />
      </div>
      <DevicesTracks video={video} audio={audio} />
    </div>
  );
};

export default DevicesLayout;
