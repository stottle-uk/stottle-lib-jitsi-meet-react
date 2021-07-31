import React from 'react';
import Conference from './Conference';

interface OwnProps {
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
}

const ConferenceContainer: React.FC<OwnProps> = ({
  connect,
  isConnected,
  isConnecting
}) => {
  return (
    <div className="container">
      {isConnected ? (
        <Conference />
      ) : (
        <>
          <button onClick={connect}>Connect</button>
          {isConnecting && <div>CONNECTING JITSI!</div>}
        </>
      )}
    </div>
  );
};

export default ConferenceContainer;
