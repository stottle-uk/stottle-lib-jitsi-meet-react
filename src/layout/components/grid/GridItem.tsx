import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import AudioTrack from '../tracks/AudioTrack';
import VideoTrack from '../tracks/VideoTrack';
import Speaking from './Speaking';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  username?: string;
  video: JitsiTrack;
  audio: JitsiTrack;
  displayUserActions: boolean;
  userAction: (userId: string, type: string) => void;
}

const GridItem: React.FC<OwnProps> = ({
  userId,
  username,
  video,
  audio,
  displayUserActions,
  userAction,
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
      </div>
      {isMuted.video && (
        <div className="grid-video">
          <p>{username}</p>
        </div>
      )}

      <AudioTrack onMuteChange={onMuteChange} track={audio} />

      <div className="grid-footer">
        <div>
          <p>
            {username} <Speaking userId={userId} />
            {isMuted.audio && (
              <FontAwesomeIcon icon={'microphone-slash'} color="red" />
            )}
          </p>
        </div>
      </div>

      {userId !== 'local' && displayUserActions && (
        <>
          <button onClick={() => userAction(userId, 'kick')}>Kick</button>
          <button onClick={() => userAction(userId, 'muteVideo')}>
            muteVideo
          </button>
          <button onClick={() => userAction(userId, 'muteAudio')}>
            muteAudio
          </button>
        </>
      )}
    </div>
  );
};

export default GridItem;
