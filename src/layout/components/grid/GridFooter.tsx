import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMutedSate } from '../../../conference/hooks/useMutedState';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import Speaking from './Speaking';

interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  username: string;
  video: JitsiTrack;
  audio: JitsiTrack;
}

const GridFooter: React.FC<OwnProps> = ({
  userId,
  username,
  video,
  audio,
  ...props
}) => {
  const isMuted = useMutedSate(audio, video);

  return (
    <div {...props}>
      <p>
        {username} <Speaking userId={userId} />
        {isMuted.audio && (
          <FontAwesomeIcon icon={'microphone-slash'} color="red" />
        )}
      </p>
    </div>
  );
};

export default GridFooter;
