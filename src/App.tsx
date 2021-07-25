import React, { useEffect } from 'react';
import './App.css';
import { useJitsiConnection } from './conference/hooks/useJitsiConnection';
import { JITSI_SERVICE_URL } from './environment/environment';
import Conference from './layout/components/Conference';

const connectionOptions = {
  hosts: {
    domain: JITSI_SERVICE_URL,
    muc: 'conference.meet.jit.si'
  },
  serviceUrl: `https://meet.jit.si/http-bind`,
  clientNode: 'http://jitsi.org/jitsimeet'
};

const conferenceOptions = {
  enableLayerSuspension: true,
  p2p: {
    enabled: false
  }
};

const App: React.FC = () => {
  const { isConnected, isConnecting, connect, disconnect } = useJitsiConnection(
    {
      sessionId: `myTestRoomNameStuart1234`.toLowerCase(),
      connectionOptions,
      conferenceOptions
      // jwtToken: session.jitsi_jwt,
    }
  );

  useEffect(() => () => disconnect(), [disconnect]);

  return isConnected ? (
    <Conference />
  ) : (
    <div>
      <button onClick={connect}>Connect</button>
      {isConnecting && <div>CONNECTING JITSI!</div>}
    </div>
  );
};

export default App;
