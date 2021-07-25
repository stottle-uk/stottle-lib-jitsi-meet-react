import React, { useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { useJitsiDevices } from '../../conference/hooks/useJitsiDevices';
import { TRACK_MUTE_CHANGED } from '../../conference/models/events/track';
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
      <AudioTrack track={audio} dispose={false}></AudioTrack>
      <VideoTrack track={video} dispose={false}></VideoTrack>
    </div>
  );
};

export default Devices;
