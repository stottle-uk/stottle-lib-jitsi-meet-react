import { useEffect, useState } from 'react';
import { JitsiConnectionOptions } from '../models/JitsiConnection';
import {
  connectionInitialState,
  ConnectionState
} from '../services/reducers/connectionReducer';
import { useJitsiConnectionState } from './useJitsiMeet';

export interface JitsiProps {
  sessionId: string;
  connectionOptions: JitsiConnectionOptions;
  jwtToken?: string | null;
}

export const useJitsiConnection = ({
  sessionId,
  connectionOptions,
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
    connection.connect(sessionId, jwtToken, connectionOptions);

  return {
    ...connectionState,
    connect,
    disconnect: () => connection.disconnect()
  };
};
