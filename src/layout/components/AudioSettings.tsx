import React from 'react';
import { JitsiTrack } from '../../conference/models/JitsiTrack';
import styles from './AudioVideoSettings.module.scss';
import DeviceOption from './DeviceOption';

interface Props {
  audio: JitsiTrack;
  audioInDevices: MediaDeviceInfo[];
  audioOutDevices: MediaDeviceInfo[];
  activeAudioOutId: string;
  setAudioOutDevice: (deviceId: string) => void;
  setAudioInDevice: (oldTrack: JitsiTrack, deviceId: string) => void;
  shouldPreventFade?: (bool: boolean) => void;
}

function AudioSettings({
  audio,
  activeAudioOutId,
  audioInDevices,
  audioOutDevices,
  setAudioInDevice,
  shouldPreventFade,
  setAudioOutDevice
}: Props) {
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!shouldPreventFade) return;
    if (visible) shouldPreventFade(true);
    else shouldPreventFade(false);
  }, [visible]); // eslint-disable-line

  const setAudioInActive = (id: string) => {
    setAudioInDevice(audio, id);
  };

  const setAudioOutActive = (id: string) => {
    setAudioOutDevice(id);
  };

  const toggleOptions = (e: any) => {
    setVisible(!visible);
  };

  const hideOptions = () => setVisible(false);

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer} onClick={toggleOptions}>
        <p>&#xb7;&#xb7;&#xb7;</p>
      </div>

      {visible && (
        <>
          <div className={styles.wrapper} onClick={hideOptions}></div>
          <div className={styles.optionsContainer}>
            <h3>Audio input</h3>
            {audioInDevices.map(d => (
              <DeviceOption
                key={d.deviceId}
                device={d}
                isActive={d.deviceId === audio.getDeviceId()}
                setActive={setAudioInActive}
              />
            ))}
            <h3>Audio ouput</h3>
            {audioOutDevices.map(d => (
              <DeviceOption
                key={d.deviceId}
                device={d}
                isActive={d.deviceId === activeAudioOutId}
                setActive={setAudioOutActive}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AudioSettings;
