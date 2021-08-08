import React, { useEffect, useState } from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import AudioTrack from '../tracks/AudioTrack';
import VideoTrack from '../tracks/VideoTrack';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  video: JitsiTrack;
  audio: JitsiTrack;
}

const GridItem: React.FC<OwnProps> = ({
  username,
  video,
  audio,
  children,
  ...props
}) => {
  const [isMuted, setMuted] = useState({
    audio: audio.isMuted(),
    video: video.isMuted()
  });

  useEffect(() => {
    setMuted({
      video: video.isMuted(),
      audio: audio.isMuted()
    });
  }, [video, audio]);

  const onMuteChange = (track: JitsiTrack) =>
    setMuted(state => ({ ...state, [track.getType()]: track.isMuted() }));

  return (
    <div {...props}>
      <div className={`grid-video ${isMuted.video && 'hidden'}`}>
        <VideoTrack onMuteChange={onMuteChange} track={video} />
        <AudioTrack onMuteChange={onMuteChange} track={audio} />
      </div>
      {isMuted.video && (
        <div className="grid-video">
          <p>{username}</p>
        </div>
      )}

      {children}
    </div>
  );
};

export default GridItem;
