import {
  CallQualityLocal,
  CallQualityRemote
} from '../../models/jitsiCallQuality';
import {
  CallQualityStateActions,
  CallQualityStateActionTypes
} from './callQualityActions';

export interface CallQualityState {
  localUser?: CallQualityLocal;
  remoteUsers: Record<string, CallQualityRemote>;
}

export const callQualityInitialState: CallQualityState = {
  localUser: undefined,
  remoteUsers: {}
};

export const callQualityReducer = (
  state = callQualityInitialState,
  action: CallQualityStateActions
): CallQualityState => {
  switch (action.type) {
    case CallQualityStateActionTypes.RemoteStatsUpdated:
      return {
        ...state,
        remoteUsers: {
          [action.payload.userId]: action.payload.stats
        }
      };

    case CallQualityStateActionTypes.LocalStatsUpdated:
      return { ...state, localUser: action.payload };

    default:
      return state;
  }
};
