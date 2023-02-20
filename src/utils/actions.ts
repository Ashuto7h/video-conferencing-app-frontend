import { ILoginSuccessPayload } from '../types';
import { AuthActionTypes } from './constants';

export const setIsLoading = (payload: boolean) => ({
  payload,
  type: AuthActionTypes.SET_IS_LOADING
});

export const loginSuccess = (payload: ILoginSuccessPayload) => ({
  payload,
  type: AuthActionTypes.LOGIN
});

export const resetAuth = () => ({ type: AuthActionTypes.RESET_AUTH });
