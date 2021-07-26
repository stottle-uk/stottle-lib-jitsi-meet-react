import React, { useEffect, useRef, useState } from 'react';
import { useJitsiDevices } from '../../conference/hooks/useJitsiDevices';
import { JitsiTrack } from '../../conference/models/JitsiTrack';
import AudioTrack from './grid/AudioTrack';
import VideoTrack from './grid/VideoTrack';

interface OwnProps {
  audio: JitsiTrack;
  video: JitsiTrack;
}

const Devices: React.FC<OwnProps> = ({ audio, video }) => {
  const {
    replaceDevice,
    setAudioOutDevice,
    videoInDevices,
    audioInDevices,
    audioOutDevices,
    audioOutId
  } = useJitsiDevices();
  const videoEl = useRef<HTMLVideoElement>(null);
  const audioEl = useRef<HTMLAudioElement>(null);

  const [isMuted, setMuted] = useState({
    audio: audio.isMuted(),
    video: video.isMuted()
  });

  useEffect(() => {
    if (videoInDevices.length && audioOutDevices.length) {
      console.log(audioOutDevices);
      console.log(videoInDevices);
    }
  }, [audioOutDevices, videoInDevices]);

  const toggleMute = async (t: JitsiTrack) =>
    t.isMuted() ? await t.unmute() : await t.mute();

  const playTestSound = () => {
    if (audioEl.current) {
      console.log(audioEl.current);
      const beepLong = new Audio('./assets/sound-go.wav');
      beepLong.play();
      // audioEl.current.src = './assets/sound-go.wav';
      audioEl.current.play();
    }
  };

  // https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
  return (
    <div>
      <button onClick={() => toggleMute(audio)}>
        {isMuted.audio ? 'Audio Muted' : 'Audio Not Muted'}
      </button>
      <button onClick={() => toggleMute(video)}>
        {isMuted.video ? 'Video Muted' : 'Video Not Muted'}
      </button>

      <div>
        <ul>
          {audioOutDevices.map(d => (
            <li key={d.deviceId} onClick={() => setAudioOutDevice(d.deviceId)}>
              {d.label} {d.deviceId === audioOutId && '(SELECTED!)'}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {audioInDevices.map(d => (
            <li
              key={d.deviceId}
              onClick={() =>
                replaceDevice(audio, {
                  devices: ['audio'],
                  micDeviceId: d.deviceId
                })
              }
            >
              {d.label}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {videoInDevices.map(d => (
            <li
              key={d.deviceId}
              onClick={() =>
                replaceDevice(video, {
                  devices: ['video'],
                  cameraDeviceId: d.deviceId
                })
              }
            >
              {d.label}
            </li>
          ))}
          <li
            onClick={() =>
              replaceDevice(video, {
                devices: ['desktop']
              })
            }
          >
            Dekstop
          </li>
        </ul>
      </div>
      <AudioTrack track={audio} dispose={false}></AudioTrack>
      <VideoTrack track={video} dispose={false}></VideoTrack>
      {/* <video autoPlay={true} ref={videoEl}></video>
      <audio muted={true} src="./assets/sound-go.wav" ref={audioEl}></audio>
      <button onClick={playTestSound}>TEST AUDIO</button> */}
    </div>
  );
};

export default Devices;
