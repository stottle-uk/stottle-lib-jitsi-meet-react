import React, { useRef, useState } from 'react';
import { useJitsiDevices } from '../../conference/hooks/useJitsiDevices';
import { JitsiTrack } from '../../conference/models/JitsiTrack';

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

  // useEffect(() => {
  //   if (videoEl.current && videoInDevices.length && audioOutDevices.length) {
  //     console.log(audioOutDevices);
  //     console.log(videoInDevices);

  //     navigator.mediaDevices
  //       .getUserMedia({
  //         video: {
  //           deviceId: {
  //             exact: videoInDevices[0].deviceId
  //           }
  //         }
  //       })
  //       .then(function (stream) {
  //         if (videoEl.current) {
  //           videoEl.current.srcObject = stream;
  //         }
  //       })
  //       .catch(function (err0r) {
  //         console.log('Something went wrong!');
  //       });

  //     navigator.mediaDevices
  //       .getUserMedia({
  //         audio: {
  //           deviceId: {
  //             exact:
  //               'e4008bc536b86cd5b98a777c2a3040a29662c4212ba09789b47ab2f92a225c6f'
  //           }
  //         }
  //       })
  //       .then(function (stream) {
  //         if (audioEl.current) {
  //           audioEl.current.srcObject = stream;
  //         }
  //       })
  //       .catch(function (err0r) {
  //         console.log('AUDIO went wrong!');
  //       });
  //   }
  // }, [audioOutDevices, videoInDevices]);

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
            <li onClick={() => setAudioOutDevice(d.deviceId)}>
              {d.label} {d.deviceId === audioOutId && '(SELECTED!)'}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {audioInDevices.map(d => (
            <li
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
              onClick={() =>
                replaceDevice(video, {
                  devices: ['audio'],
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
      {/* <AudioTrack track={audio} dispose={false}></AudioTrack>
      <VideoTrack track={video} dispose={false}></VideoTrack> */}
      <video autoPlay={true} ref={videoEl}></video>
      <audio muted={true} src="./assets/sound-go.wav" ref={audioEl}></audio>
      <button onClick={playTestSound}>TEST AUDIO</button>
    </div>
  );
};

export default Devices;
