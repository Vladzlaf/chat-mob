import {LOG_OUT, SET_AUTHENTICATED} from '@utils/helpers/constants';

export type AuthAction =
  | {type: 'SET_AUTHENTICATED'; payload: string}
  | {type: 'LOG_OUT'};

export type SetAuthenticatedAction = {
  type: typeof SET_AUTHENTICATED;
  payload: string;
};

export type LogOutAction = {
  type: typeof LOG_OUT;
};

export type DispatchType = (
  action: SetAuthenticatedAction | LogOutAction,
) => void;
