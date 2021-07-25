import { useEffect, useState } from 'react';
import {
  statsInitialState,
  StatsState
} from '../services/reducers/statsReducer';
import { useJitsiStatsState } from './useJitsiMeet';

export const useJitsiStats = () => {
  const jitsiStats = useJitsiStatsState();
  const [statsState, setStatsState] = useState<StatsState>(statsInitialState);

  useEffect(() => {
    const sub = jitsiStats.state$.subscribe(state => setStatsState(state));

    return () => {
      sub.unsubscribe();
    };
  }, [jitsiStats]);

  return statsState;
};
