import { User } from '../user.model';
import * as AuthAction from './auth.actions';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: null,
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthAction.AuthActions
) {
  switch (action.type) {
    case AuthAction.AUTHENTICATE_SUCCESS:
      console.log(action.payload, 'authenticate success');
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
        authError: null,
        loading: false,
      };
    case AuthAction.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthAction.LOGIN_START:
    case AuthAction.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case AuthAction.AUTHENTICATE_FAIL:
      return {
        ...state,
        authError: action.payload,
        loading: false,
      };

    case AuthAction.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
