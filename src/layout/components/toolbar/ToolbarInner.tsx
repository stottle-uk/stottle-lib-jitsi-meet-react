import React, { useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { useJitsiDevices } from '../../../conference/hooks/useJitsiDevices';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import {
  CreateTracksOptions,
  JitsiTrack
} from '../../../conference/models/JitsiTrack';
import CallButton from './CallButton';

interface OwnProps {
  audio: JitsiTrack;
  video: JitsiTrack;
  leaveConference: () => void;
  muteAll: () => void;
  showSettings: () => void;
  replaceDevice: (oldTrack: JitsiTrack, options: CreateTracksOptions) => void;
}

const ToolbarInner: React.FC<OwnProps> = ({
  audio,
  video,
  leaveConference,
  showSettings
}) => {
  const { replaceDevice } = useJitsiDevices();

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

    return () => sub.unsubscribe();
  }, [audio, video]);

  const toggleMute = async (t: JitsiTrack) =>
    t.isMuted() ? await t.unmute() : await t.mute();

  const startScreenShare = (oldTrack: JitsiTrack) =>
    replaceDevice(oldTrack, {
      devices: ['desktop']
    });

  const stopScreenShare = (oldTrack: JitsiTrack) =>
    replaceDevice(oldTrack, {
      devices: ['video']
    });

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <div className="btn">
          <CallButton
            title={isMuted.audio ? 'Mic off' : 'Mic on'}
            logo={isMuted.audio ? 'microphone-slash' : 'microphone'}
            onClick={() => toggleMute(audio)}
          />
        </div>
        <div className="btn">
          <CallButton
            title={isMuted.video ? 'Cam off' : 'Cam on'}
            logo={isMuted.video ? 'video-slash' : 'video'}
            onClick={() => toggleMute(video)}
          />
        </div>
        <div className="btn">
          <CallButton
            title={
              video.videoType === 'desktop'
                ? 'Turn off Screen Share'
                : 'Screen Share'
            }
            logo={'desktop'}
            color={video.videoType === 'desktop' ? 'green' : 'white'}
            onClick={() =>
              video.videoType === 'desktop'
                ? stopScreenShare(video)
                : startScreenShare(video)
            }
          />
        </div>
        <div className="btn">
          <CallButton
            title="Exit Call"
            logo={'phone-slash'}
            color="red"
            onClick={() => leaveConference()}
          />
        </div>
        <div className="btn">
          <CallButton
            title="Settings"
            logo={'cog'}
            onClick={() => showSettings()}
          />
        </div>
      </div>
    </div>
  );
};

export default ToolbarInner;
