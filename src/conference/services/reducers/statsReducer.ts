import { StatsActionTypes, StatsStateActions } from './statsActions';

export interface StatsState {
  speakers: Record<string, number>;
}

export const statsInitialState: StatsState = {
  speakers: {}
};

export const statsReducer = (
  state = statsInitialState,
  action: StatsStateActions
): StatsState => {
  switch (action.type) {
    case StatsActionTypes.UpdateUserAudioLevel:
      return {
        ...state,
        speakers: {
          ...state.speakers,
          [action.payload.userId]: action.payload.level
        }
      };

    default:
      return state;
  }
};
