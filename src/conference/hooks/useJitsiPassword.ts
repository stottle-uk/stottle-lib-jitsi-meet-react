import { useObservableState } from 'observable-hooks';
import { passwordInitialState } from '../services/reducers/passwordReducer';
import { useJitsiPasswordState } from './useJitsiMeet';

export const useJitsiPassword = () => {
  const passwords = useJitsiPasswordState();
  const passwordState = useObservableState(
    passwords.state$,
    passwordInitialState
  );

  const lockRoom = (password: string) => passwords.lockRoom(password);

  return { ...passwordState, lockRoom };
};
