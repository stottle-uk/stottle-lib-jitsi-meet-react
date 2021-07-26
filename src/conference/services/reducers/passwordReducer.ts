import { PasswordActionTypes, PasswordStateActions } from './passwordActions';

export interface PasswordState {
  passwordRequired: boolean;
}

export const passwordInitialState: PasswordState = {
  passwordRequired: false
};

export const passwordReducer = (
  state = passwordInitialState,
  action: PasswordStateActions
): PasswordState => {
  switch (action.type) {
    case PasswordActionTypes.SetPasswordRequired:
      return {
        ...state,
        passwordRequired: action.payload
      };

    default:
      return state;
  }
};
