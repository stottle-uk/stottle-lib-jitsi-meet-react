import { useObservableState } from 'observable-hooks';
import { statsInitialState } from '../services/reducers/statsReducer';
import { useJitsiStatsState } from './useJitsiMeet';

export const useJitsiStats = () => {
  const jitsiStats = useJitsiStatsState();
  const statsState = useObservableState(jitsiStats.state$, statsInitialState);

  return statsState;
};
