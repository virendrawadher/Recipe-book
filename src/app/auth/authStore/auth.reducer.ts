import { User } from '../user.model';
import * as AuthAction from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthAction.AuthActions
) {
  switch (action.type) {
    case AuthAction.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expriationDate
      );
      return {
        ...state,
        user,
      };
    case AuthAction.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
