import React, { useState } from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import CallButton from '../toolbar/CallButton';
import AudioTrack from '../tracks/AudioTrack';
import VideoTrack from '../tracks/VideoTrack';

interface OwnProps {
  audio: JitsiTrack;
  video: JitsiTrack;
}

const DevicesTracks: React.FC<OwnProps> = ({ audio, video }) => {
  const [isMuted, setMuted] = useState({
    audio: audio.isMuted(),
    video: video.isMuted()
  });

  const toggleMute = async (t: JitsiTrack) =>
    t.isMuted() ? await t.unmute() : await t.mute();

  return (
    <>
      <div className="video-containor">
        <AudioTrack
          onMuteChange={isMuted => setMuted(m => ({ ...m, audio: isMuted }))}
          track={audio}
          dispose={false}
        ></AudioTrack>
        <VideoTrack
          onMuteChange={isMuted => setMuted(m => ({ ...m, video: isMuted }))}
          track={video}
          dispose={false}
        ></VideoTrack>
      </div>
      <div className="toolbar">
        <div className="btn">
          <CallButton
            title={isMuted.audio ? 'Mic off' : 'Mic on'}
            logo={isMuted.audio ? 'microphone-slash' : 'microphone'}
            onClick={() => toggleMute(audio)}
          />
        </div>
        <div className="btn">
          <CallButton
            title={isMuted.video ? 'Cam off' : 'Cam on'}
            logo={isMuted.video ? 'video-slash' : 'video'}
            onClick={() => toggleMute(video)}
          />
        </div>
      </div>
    </>
  );
};

export default DevicesTracks;
