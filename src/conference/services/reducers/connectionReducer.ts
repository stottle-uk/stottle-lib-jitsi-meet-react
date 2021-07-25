import {
  ConnectionStateActions,
  ConnectionStateActionTypes
} from './connectionActions';

export interface ConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
}

export const connectionInitialState: ConnectionState = {
  isConnected: false,
  isConnecting: false
};

export const connectionReducer = (
  state = connectionInitialState,
  action: ConnectionStateActions
): ConnectionState => {
  switch (action.type) {
    case ConnectionStateActionTypes.SetConnected:
      return {
        ...state,
        isConnected: action.payload
      };

    case ConnectionStateActionTypes.SetIsConnecting:
      return {
        ...state,
        isConnecting: action.payload
      };

    default:
      return state;
  }
};
