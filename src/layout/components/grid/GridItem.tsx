import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import AudioTrack from '../tracks/AudioTrack';
import VideoTrack from '../tracks/VideoTrack';
import Speaking from './Speaking';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  username?: string;
  video?: JitsiTrack;
  audio?: JitsiTrack;
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
  const [isAudioMuted, setAudioMuted] = useState(false);
  const [isVideoMuted, setVideoMuted] = useState(false);

  useEffect(() => {
    video && setVideoMuted(video.isMuted());
    audio && setAudioMuted(audio.isMuted());
  }, [video, audio]);

  const onMuteChange = (isMuted: boolean, track: JitsiTrack) => {
    track.getType() === 'video' && setVideoMuted(isMuted);
    track.getType() === 'audio' && setAudioMuted(isMuted);
  };

  return (
    <div {...props}>
      <div className="item">
        {video && (
          <>
            <div className={`item-track-video ${isVideoMuted && 'hidden'}`}>
              <VideoTrack
                onMuteChange={m => onMuteChange(m, video)}
                track={video}
              />
            </div>
            {isVideoMuted && (
              <div className="item-track-video">
                <p>no cam</p>
              </div>
            )}
          </>
        )}
        {audio && (
          <AudioTrack
            onMuteChange={m => onMuteChange(m, audio)}
            track={audio}
          />
        )}

        <div className="item-footer">
          <div>
            <p>
              {username} <Speaking userId={userId} />
              {isAudioMuted && (
                <FontAwesomeIcon icon={'microphone-slash'} color="red" />
              )}
            </p>
          </div>
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
