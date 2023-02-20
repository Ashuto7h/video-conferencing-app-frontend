/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode } from 'react';
import { createContext, FC, useContext, useReducer } from 'react';
import { IAuthContext, IAuthState, IUser, TAuthActions } from '../types/auth-context';
import { AuthActionTypes } from '../utils/constants';

const { LOGIN, RESET_AUTH, SET_IS_LOADING, UPDATE_PROFILE_IMG } = AuthActionTypes;

const initState: IAuthState = {
  isLoading: false,
  token: localStorage.getItem('token') ?? '',
  user: JSON.parse(localStorage.getItem('user') || 'null') || { email: '', imageUrl: '', name: '' }
};

const AuthContext = createContext<IAuthContext | null>(null);

const setUser = (
  state: IAuthState,
  { token, name, email, imageUrl }: IUser & { token?: string }
) => {
  localStorage.setItem('user', JSON.stringify({ email, imageUrl, name }));
  localStorage.setItem('token', token || '');
  return {
    ...state,
    token,
    user: { email, imageUrl, name }
  };
};

const authReducer = (state: IAuthState, action: TAuthActions): IAuthState => {
  switch (action.type) {
    case LOGIN:
      return setUser(state, action.payload);
    case RESET_AUTH:
      return {
        isLoading: false,
        token: undefined,
        user: undefined
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case UPDATE_PROFILE_IMG:
      setUser(state, {
        imageUrl: action.payload,
        token: state.token,
        email: state.user?.email || '',
        name: state.user?.name || ''
      });
      return {
        ...state,
        user: {
          imageUrl: action.payload,
          email: state.user?.email || '',
          name: state.user?.name || ''
        }
      };
  }
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  return <AuthContext.Provider value={{ dispatch, state }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
