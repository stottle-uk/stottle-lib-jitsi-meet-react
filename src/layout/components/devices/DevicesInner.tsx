import React, { useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import {
  CreateTracksOptions,
  JitsiTrack
} from '../../../conference/models/JitsiTrack';
import AudioTrack from '../grid/AudioTrack';
import VideoTrack from '../grid/VideoTrack';
import DevicesSelect from './DevicesSelect';

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

const DevicesInner: React.FC<OwnProps> = ({
  replaceDevice,
  setAudioOutDevice,
  videoInDevices,
  audioInDevices,
  audioOutDevices,
  audioOutId,
  audio,
  video
}) => {
  const [isMuted, setMuted] = useState({
    audio: audio.isMuted(),
    video: video.isMuted()
  });

  useEffect(() => {
    const sub = merge(
      fromEvent<JitsiTrack>(audio, TRACK_MUTE_CHANGED),
      fromEvent<JitsiTrack>(video, TRACK_MUTE_CHANGED)
    ).subscribe(track => {
      setMuted(state => ({ ...state, [track.getType()]: track.isMuted() }));
    });
    audio.mute();

    return () => sub.unsubscribe();
  }, [audio, video]);

  const toggleMute = async (t: JitsiTrack) =>
    t.isMuted() ? await t.unmute() : await t.mute();

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
          onSelect={deviceId => setAudioOutDevice(deviceId)}
        />
      </div>
      <div>
        <DevicesSelect
          label="Audio In"
          devices={audioInDevices}
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
          onSelect={deviceId =>
            replaceDevice(audio, {
              devices: ['video'],
              micDeviceId: deviceId
            })
          }
        />
      </div>

      <div className="video-containor">
        <AudioTrack track={audio} dispose={false}></AudioTrack>
        <VideoTrack track={video} dispose={false}></VideoTrack>
      </div>
      <button onClick={() => toggleMute(audio)}>
        {isMuted.audio ? 'Audio Muted' : 'Audio Not Muted'}
      </button>
      <button onClick={() => toggleMute(video)}>
        {isMuted.video ? 'Video Muted' : 'Video Not Muted'}
      </button>
    </div>
  );
};

export default DevicesInner;
