import { useObservableState } from 'observable-hooks';
import { callQualityInitialState } from '../services/reducers/callQualityReducer';
import { useJitsiCallQualityState } from './useJitsiMeet';

export const useJitsiCallQuality = () => {
  const callQuality = useJitsiCallQualityState();
  const conferenceState = useObservableState(
    callQuality.state$,
    callQualityInitialState
  );

  return conferenceState;
};
