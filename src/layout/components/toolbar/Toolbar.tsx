import React, { useState } from 'react';
import { useJitsiActions } from '../../../conference/hooks/useJitsiActions';
import { useJitsiConference } from '../../../conference/hooks/useJitsiConference';
import { useJitsiDevices } from '../../../conference/hooks/useJitsiDevices';
import { useJitsiPassword } from '../../../conference/hooks/useJitsiPassword';
import { useJitsiTracks } from '../../../conference/hooks/useJitsiTracks';
import Settings from '../settings/Settings';
import ToolbarInner from './ToolbarInner';

const Toolbar: React.FC = () => {
  const { muteParticipant } = useJitsiActions();
  const { replaceDevice } = useJitsiDevices();
  const { leaveConference } = useJitsiConference();
  const { localTracks, allTracks } = useJitsiTracks('ME');
  const { lockRoom } = useJitsiPassword();

  const [settingsVisible, setSettingsVisible] = useState(false);

  const muteAll = () =>
    Object.keys(allTracks).forEach(userId => muteParticipant(userId, 'audio'));

  return (
    <>
      {localTracks.audio && localTracks.video && (
        <>
          <ToolbarInner
            video={localTracks.video}
            audio={localTracks.audio}
            muteAll={muteAll}
            showSettings={() => setSettingsVisible(!settingsVisible)}
            leaveConference={leaveConference}
            replaceDevice={replaceDevice}
          />
          <Settings
            isVisible={settingsVisible}
            subitPassword={p => lockRoom(p)}
            onClose={() => setSettingsVisible(!settingsVisible)}
          />
        </>
      )}
    </>
  );
};

export default Toolbar;
