import React, { useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import AudioTrack from '../grid/AudioTrack';
import VideoTrack from '../grid/VideoTrack';

interface OwnProps {
  audio: JitsiTrack;
  video: JitsiTrack;
}

const DevicesTracksInner: React.FC<OwnProps> = ({ audio, video }) => {
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
    <>
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
    </>
  );
};

export default DevicesTracksInner;
