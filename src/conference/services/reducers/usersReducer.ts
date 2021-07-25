import { JitsiParticipant } from '../../models/JitsiParticipant';
import { UsersStateActions, UsersStateActionTypes } from './usersActions';

export interface UsersState {
  isConnected: boolean;
  wasKicked: boolean;
  hasLeftRoom: boolean;
  users: Record<string, JitsiParticipant>;
  userIds: string[];
}

export const usersInitialState: UsersState = {
  isConnected: false,
  wasKicked: false,
  hasLeftRoom: false,
  users: {},
  userIds: []
};

export const usersReducer = (
  state = usersInitialState,
  action: UsersStateActions
): UsersState => {
  switch (action.type) {
    case UsersStateActionTypes.AddUser:
      return {
        ...state,
        userIds: [...state.userIds, action.payload.userId],
        users: {
          ...state.users,
          [action.payload.userId]: action.payload.user
        }
      };

    case UsersStateActionTypes.RemoveUser:
      const userIds = state.userIds.filter(id => id !== action.payload);

      return {
        ...state,
        userIds,
        users: userIds.reduce(
          (prev, curr) => ({ ...prev, [curr]: state.users[curr] }),
          {}
        )
      };

    default:
      return state;
  }
};
