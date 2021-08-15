import { useObservableState } from 'observable-hooks';
import { conferenceInitialState } from '../services/reducers/conferenceReducer';
import { useJitsiConferenceState } from './useJitsiMeet';

export const useJitsiConference = () => {
  const conference = useJitsiConferenceState();
  const conferenceState = useObservableState(
    conference.state$,
    conferenceInitialState
  );

  const joinConference = (username: string, password?: string) =>
    conference.joinConference(username, password);

  const leaveConference = () => conference.leaveConference();

  return { ...conferenceState, joinConference, leaveConference };
};
