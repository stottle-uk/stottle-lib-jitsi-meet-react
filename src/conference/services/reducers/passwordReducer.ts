import { PasswordActionTypes, PasswordStateActions } from './passwordActions';

export interface PasswordState {
  passwordRequired: boolean;
  attempts: number;
}

export const passwordInitialState: PasswordState = {
  passwordRequired: false,
  attempts: 0
};

export const passwordReducer = (
  state = passwordInitialState,
  action: PasswordStateActions
): PasswordState => {
  switch (action.type) {
    case PasswordActionTypes.SetPasswordRequired:
      return {
        ...state,
        passwordRequired: action.payload,
        attempts: state.attempts + 1
      };

    default:
      return state;
  }
};
