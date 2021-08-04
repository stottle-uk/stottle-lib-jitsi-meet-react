import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import ParticipantTrack from '../tracks/ParticipantTrack';
import Speaking from './Speaking';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  username?: string;
  tracks: JitsiTrack[];
  participantsLength: number;
  displayUserActions: boolean;
  userAction: (userId: string, type: string) => void;
}

const GridItem: React.FC<OwnProps> = ({
  userId,
  username,
  tracks,
  displayUserActions,
  userAction,
  ...props
}) => {
  const [isAudioMuted, setAudioMuted] = useState(false);
  const [isVideoMuted, setVideoMuted] = useState(false);

  useEffect(() => {
    tracks.forEach(t => {
      if (t.getType() === 'video') {
        setVideoMuted(t.isMuted());
      }
      if (t.getType() === 'audio') {
        setAudioMuted(t.isMuted());
      }
    });
  }, [tracks]);

  const onMuteChange = (isMuted: boolean, track: JitsiTrack) => {
    if (track.getType() === 'video') {
      setVideoMuted(isMuted);
    }
    if (track.getType() === 'audio') {
      setAudioMuted(isMuted);
    }
  };

  return (
    <div {...props}>
      <div className="item">
        {tracks.map(t => (
          <div className={`item-track-${t.getType()}`} key={t.getId()}>
            <ParticipantTrack
              onMuteChange={m => onMuteChange(m, t)}
              track={t}
            />
          </div>
        ))}
        {isVideoMuted && (
          <div className="item-track-video">
            <p>no cam</p>
          </div>
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
