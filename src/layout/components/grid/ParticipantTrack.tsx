import React from 'react';
import { JitsiTrack } from '../../../conference/models/JitsiTrack';
import AudioTrack from './AudioTrack';
import VideoTrack from './VideoTrack';

interface OwnProps {
  track: JitsiTrack;
  onMuteChange: (muted: boolean) => void;
}

const ParticipantTrack: React.FC<OwnProps> = ({ track, onMuteChange }) => (
  <>
    {track.getType() === 'video' ? (
      <VideoTrack track={track} onMuteChange={onMuteChange} />
    ) : (
      <AudioTrack track={track} onMuteChange={onMuteChange} />
    )}
  </>
);

export default ParticipantTrack;
