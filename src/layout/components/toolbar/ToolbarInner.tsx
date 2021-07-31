import React, { useEffect, useState } from 'react';
import { fromEvent, merge } from 'rxjs';
import { useJitsiDevices } from '../../../conference/hooks/useJitsiDevices';
import { TRACK_MUTE_CHANGED } from '../../../conference/models/events/track';
import {
  CreateTracksOptions,
  JitsiTrack
} from '../../../conference/models/JitsiTrack';
import CallButton from './CallButton';
import callBtnStyles from './CallButton.module.scss';
import styles from './Toolbar.module.scss';

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
  muteAll,
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
    audio.mute();
    // video.mute();

    return () => sub.unsubscribe();
  }, [audio, video]);

  const toggleMute = async (t: JitsiTrack) =>
    t.isMuted() ? await t.unmute() : await t.mute();

  const startScreenShare = (oldTrack: JitsiTrack) =>
    replaceDevice(oldTrack, {
      devices: ['desktop']
    });

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.btn}>
          <CallButton
            caption={isMuted.audio ? 'Mic off' : 'Mic on'}
            logo={isMuted.audio ? 'microphone-slash' : 'microphone'}
            onClick={() => toggleMute(audio)}
            className={`${callBtnStyles.callBtnAudio} ${
              isMuted.audio && callBtnStyles.audioMuted
            }`}
          />
        </div>
        <div className={styles.btn}>
          <CallButton
            caption={'Desktop'}
            logo={'desktop'}
            onClick={() => startScreenShare(video)}
            className={callBtnStyles['call-btn-camera']}
          />
        </div>
        <div className={styles.btn}>
          <CallButton
            caption={isMuted.video ? 'Cam off' : 'Cam on'}
            logo={isMuted.video ? 'video-slash' : 'video'}
            onClick={() => toggleMute(video)}
            className={callBtnStyles['call-btn-camera']}
          />
        </div>
        <div className={styles.btn}>
          <CallButton
            caption="Exit Call"
            logo={'phone-slash'}
            onClick={() => leaveConference()}
            className={callBtnStyles['call-btn-hangup']}
          />
        </div>
        <div className={styles.btn}>
          <CallButton
            caption="Mute All"
            logo={'volume-mute'}
            onClick={() => muteAll()}
            className={callBtnStyles['call-btn-hangup']}
          />
        </div>
        <div className={styles.btn}>
          <CallButton
            caption="Settings"
            logo={'cog'}
            onClick={() => showSettings()}
            className={callBtnStyles['call-btn-last']}
          />
        </div>
      </div>
    </div>
  );
};

export default ToolbarInner;
