import { useEffect, useState } from 'react';
import { JitsiConferenceOptions } from '../models/JitsiConference';
import {
  conferenceInitialState,
  ConferenceState
} from '../services/reducers/conferenceReducer';
import { useJitsiConferenceState } from './useJitsiMeet';

export interface JitsiProps {
  sessionId: string;
  username: string;
  conferenceOptions: JitsiConferenceOptions;
}

export const useJitsiConference = ({
  sessionId,
  username,
  conferenceOptions
}: JitsiProps) => {
  const conference = useJitsiConferenceState();
  const [conferenceState, setConferenceState] = useState<ConferenceState>(
    conferenceInitialState
  );

  useEffect(() => {
    const sub = conference.state$.subscribe(state => setConferenceState(state));

    return () => {
      sub.unsubscribe();
    };
  }, [conference]);

  const joinConference = () =>
    conference.joinConference(username, sessionId, conferenceOptions);

  const leaveConference = () => conference.leaveConference();

  return { ...conferenceState, joinConference, leaveConference };
};
