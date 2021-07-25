import { useEffect, useState } from 'react';
import { JitsiConferenceOptions } from '../models/JitsiConference';
import { JitsiConnectionOptions } from '../models/JitsiConnection';
import {
  connectionInitialState,
  ConnectionState
} from '../services/reducers/connectionReducer';
import { useJitsiConnectionState } from './useJitsiMeet';

export interface JitsiProps {
  sessionId: string;
  connectionOptions: JitsiConnectionOptions;
  conferenceOptions: JitsiConferenceOptions;
  jwtToken?: string | null;
}

export const useJitsiConnection = ({
  sessionId,
  connectionOptions,
  conferenceOptions,
  jwtToken = null
}: JitsiProps) => {
  const connection = useJitsiConnectionState();
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    connectionInitialState
  );

  useEffect(() => {
    const sub = connection.state$.subscribe(state => setConnectionState(state));

    return () => {
      sub.unsubscribe();
    };
  }, [connection]);

  const connect = () =>
    connection.connect(
      sessionId,
      jwtToken,
      connectionOptions,
      conferenceOptions
    );

  return {
    ...connectionState,
    connect,
    disconnect: () => connection.disconnect()
  };
};
