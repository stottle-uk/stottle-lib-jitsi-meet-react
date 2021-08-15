import { useObservableState } from 'observable-hooks';
import { usersInitialState } from '../services/reducers/usersReducer';
import { useJitsiUsersState } from './useJitsiMeet';

export const useJitsiUsers = () => {
  const users = useJitsiUsersState();
  const usersState = useObservableState(users.state$, usersInitialState);

  return {
    userIds: usersState.userIds,
    users: usersState.users
  };
};
