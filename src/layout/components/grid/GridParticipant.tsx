import React, { useRef } from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import styles from './Grid.module.scss';
import ParticipantTrack from './ParticipantTrack';

interface ExtractedTracks {
  audio: JitsiTrack | undefined;
  video: JitsiTrack | undefined;
}

interface OwnProps {
  id: string;
  username?: string;
  tracks: JitsiTrack[];
  participantsLength: number;
  displayUserActions: boolean;
  userAction: (userId: string, type: string) => void;
}

const GridParticipant: React.FC<OwnProps> = ({
  id,
  username,
  tracks,
  displayUserActions,
  userAction
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { audio, video } = tracks.reduce<ExtractedTracks>(
    (prev, curr) => ({ ...prev, [curr.getType()]: curr }),
    {
      video: undefined,
      audio: undefined
    }
  );

  return (
    <div key={id} className={styles.gridParticipant} ref={containerRef}>
      <div className={styles.participant}>
        {video && (
          <div className={styles.video}>
            <ParticipantTrack track={video} key={video.getId()} />
          </div>
        )}

        {audio && (
          <div className={styles.audio}>
            <ParticipantTrack track={audio} key={audio.getId()} />
          </div>
        )}

        {!video && (
          <div className={styles.novid}>
            <p>no cam</p>
          </div>
        )}

        <p className={styles.username}>{username}</p>

        {id !== 'local' && displayUserActions && (
          <>
            <button onClick={() => userAction(id, 'kick')}>Kick</button>
            <button onClick={() => userAction(id, 'muteVideo')}>
              muteVideo
            </button>
            <button onClick={() => userAction(id, 'muteAudio')}>
              muteAudio
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GridParticipant;
