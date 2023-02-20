import { Dispatch } from 'react';
import { AuthActionTypes } from '../utils/constants';

export interface IUser {
  email?: string;
  imageUrl?: string;
  name?: string;
}

export interface IAuthState {
  isLoading: boolean;
  token?: string;
  user?: IUser;
}

export interface IAuthContext {
  state: IAuthState;
  dispatch: Dispatch<TAuthActions>;
}

export interface ILoginSuccessPayload {
  token?: string;
  name?: string;
  email?: string;
  imageUrl?: string;
}

type TLoginAction = { type: typeof AuthActionTypes.LOGIN; payload: ILoginSuccessPayload };
type TResetAuthAction = { type: typeof AuthActionTypes.RESET_AUTH };
type TSetIsLoadingAction = { type: typeof AuthActionTypes.SET_IS_LOADING; payload: boolean };
type TUpdateProfileImgAction = { type: typeof AuthActionTypes.UPDATE_PROFILE_IMG; payload: string };
export type TAuthActions =
  | TLoginAction
  | TResetAuthAction
  | TSetIsLoadingAction
  | TUpdateProfileImgAction;
