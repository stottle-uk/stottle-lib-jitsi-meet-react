import React from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import AudioTrack from './AudioTrack';
import VideoTrack from './VideoTrack';

interface OwnProps {
  track: JitsiTrack;
}

const ParticipantTrack: React.FC<OwnProps> = ({ track }) => (
  <>
    {track.getType() === 'video' ? (
      <VideoTrack track={track} />
    ) : (
      <AudioTrack track={track} />
    )}
  </>
);

export default ParticipantTrack;
