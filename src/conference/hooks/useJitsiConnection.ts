import { useObservableState } from 'observable-hooks';
import { JitsiConferenceOptions } from '../models/JitsiConference';
import { JitsiConnectionOptions } from '../models/JitsiConnection';
import { connectionInitialState } from '../services/reducers/connectionReducer';
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
  const connectionState = useObservableState(
    connection.state$,
    connectionInitialState
  );

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
