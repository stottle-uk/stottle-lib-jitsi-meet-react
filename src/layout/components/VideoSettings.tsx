import React from 'react';
import { JitsiTrack } from '../../conference/models/JitsiTrack';
import styles from './AudioVideoSettings.module.scss';
import DeviceOption from './DeviceOption';

interface Props {
  video: JitsiTrack;
  videoInDevices: MediaDeviceInfo[];
  shouldPreventFade?: (bool: boolean) => void;
  setVideoInDevice: (oldTrack: JitsiTrack, deviceId: string) => void;
}

function VideoSettings({
  video,
  videoInDevices,
  setVideoInDevice,
  shouldPreventFade
}: Props) {
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!shouldPreventFade) return;
    if (visible) shouldPreventFade(true);
    else shouldPreventFade(false);
  }, [visible]); // eslint-disable-line

  const setVideoInActive = (id: string) => {
    setVideoInDevice(video, id);
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
            <h3>Video ouput</h3>
            {videoInDevices.map(d => (
              <DeviceOption
                key={d.deviceId}
                device={d}
                isActive={d.deviceId === video.getDeviceId()}
                setActive={setVideoInActive}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VideoSettings;
