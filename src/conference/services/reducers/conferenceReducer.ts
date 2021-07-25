import {
  ConferenceStateActions,
  ConferenceStateActionTypes
} from './conferenceActions';

export interface ConferenceState {
  created: number; // timestamp
  isJoined: boolean;
  hasLeftRoom: boolean;
  wasKicked: boolean;
  role: string;
  myUserId: string;
  roomname: string;
  isHidden: boolean;
}

export const conferenceInitialState: ConferenceState = {
  created: 0,
  isJoined: false,
  hasLeftRoom: false,
  wasKicked: false,
  role: 'unknown',
  myUserId: 'unknown',
  roomname: '',
  isHidden: false
};

export const conferenceReducer = (
  state = conferenceInitialState,
  action: ConferenceStateActions
): ConferenceState => {
  switch (action.type) {
    case ConferenceStateActionTypes.SetUserData:
      return { ...state, ...action.payload };

    case ConferenceStateActionTypes.SetCreatedTimestamp:
      return { ...state, created: action.payload };

    case ConferenceStateActionTypes.SetJoined:
      return {
        ...state,
        isJoined: action.payload,
        hasLeftRoom: action.payload === false
      };

    case ConferenceStateActionTypes.SetKicked:
      return { ...state, wasKicked: true };

    default:
      return state;
  }
};
