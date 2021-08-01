import React, { useState } from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import AudioTrack from '../grid/AudioTrack';
import VideoTrack from '../grid/VideoTrack';

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
      <button onClick={() => toggleMute(audio)}>
        {isMuted.audio ? 'Audio Muted' : 'Audio Not Muted'}
      </button>
      <button onClick={() => toggleMute(video)}>
        {isMuted.video ? 'Video Muted' : 'Video Not Muted'}
      </button>
    </>
  );
};

export default DevicesTracks;
