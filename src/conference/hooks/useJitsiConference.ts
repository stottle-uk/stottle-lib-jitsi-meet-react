import { useEffect, useState } from 'react';
import {
  conferenceInitialState,
  ConferenceState
} from '../services/reducers/conferenceReducer';
import { useJitsiConferenceState } from './useJitsiMeet';

export const useJitsiConference = () => {
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

  const joinConference = (username: string) =>
    conference.joinConference(username);

  const leaveConference = () => conference.leaveConference();

  return { ...conferenceState, joinConference, leaveConference };
};
