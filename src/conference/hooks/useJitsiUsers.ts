import { useEffect, useState } from 'react';
import {
  usersInitialState,
  UsersState
} from '../services/reducers/usersReducer';
import { useJitsiUsersState } from './useJitsiMeet';

export const useJitsiUsers = () => {
  const users = useJitsiUsersState();
  const [usersState, setUsersState] = useState<UsersState>(usersInitialState);

  useEffect(() => {
    const sub = users.state$.subscribe(state => setUsersState(state));

    return () => {
      sub.unsubscribe();
    };
  }, [users]);

  return {
    userIds: usersState.userIds,
    users: usersState.users
  };
};
