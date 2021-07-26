import { useEffect, useState } from 'react';
import {
  passwordInitialState,
  PasswordState
} from '../services/reducers/passwordReducer';
import { useJitsiPasswordState } from './useJitsiMeet';

export const useJitsiPassword = () => {
  const passwords = useJitsiPasswordState();
  const [passwordState, setPasswordState] =
    useState<PasswordState>(passwordInitialState);

  useEffect(() => {
    const sub = passwords.state$.subscribe(state => setPasswordState(state));

    return () => {
      sub.unsubscribe();
    };
  }, [passwords]);

  const lockRoom = (password: string) => passwords.lockRoom(password);

  return { ...passwordState, lockRoom };
};
