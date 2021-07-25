import { useEffect, useState } from 'react';
import { JitsiConferenceOptions } from '../models/JitsiConference';
import {
  conferenceInitialState,
  ConferenceState
} from '../services/reducers/conferenceReducer';
import { useJitsiConferenceState } from './useJitsiMeet';

export const useJitsiConference = (
  conferenceOptions: JitsiConferenceOptions
) => {
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

  const joinConference = (sessionId: string, username: string) =>
    conference.joinConference(username, sessionId, conferenceOptions);

  const leaveConference = () => conference.leaveConference();

  return { ...conferenceState, joinConference, leaveConference };
};
