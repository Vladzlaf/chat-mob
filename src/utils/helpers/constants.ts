import {Dimensions} from 'react-native';
export const API_URL = '';

const {height: windowHeight} = Dimensions.get('window');
export const BOTTOM_SHEET_MAX_HEIGHT = windowHeight - 100;


//Actions
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const LOG_OUT = 'LOG_OUT';
export const SET_USER_DATA = 'SET_USER_DATA';

//Errors
export enum BackendErrorPaths {
  UserNotExist = 'errors.user.notExist',
  UserExist = 'errors.user.userExist',
  UserNotActive = 'errors.user.notActive',
  ExpiredOtp = 'errors.user.expiredOtp',
  ErrorAccountDeleting = 'errors.user.errorAccountDeleting',
  OtpNotValid = 'errors.otp.notValid',
  OtpNotVerified = 'errors.otp.notVerified',
  PasswordNotValid = 'errors.password.notValid',
  PasswordDoesNotMatch = 'errors.password.doesNotMatch',
  PasswordTooWeak = 'errors.password.tooWeak',
  SendingEmailError = 'errors.email.sendingEmailError',
}

