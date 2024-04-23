export enum Routes {
  WELCOME_PAGE = 'WELCOME_PAGE',
  REGISTRATION = 'REGISTRATION',
  NO_INTERNET = 'NO_INTERNET',
  PROFILE_ACTIONS_SCREEN = 'PROFILE_ACTIONS_SCREEN',
  BOTTOM_TAB = 'BOTTOM_TAB',
  FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS',

  LOG_IN_SCREEN = 'LOG_IN_SCREEN',
  SIGN_UP_SCREEN = 'SIGN_UP_SCREEN',
  PHONE_SCREEN = 'PHONE_SCREEN',
  CODE_SCREEN = 'CODE_SCREEN',
  CREATE_PASSWORD_SCREEN = 'CREATE_PASSWORD_SCREEN',
  EMAIL_SUCCESS_VERIFICATION_SCREEN = 'EMAIL_SUCCESS_VERIFICATION_SCREEN',

  FORGOT_SCREEN = 'FORGOT_SCREEN',
  PROFILE_NAVIGATOR = 'PROFILE_NAVIGATOR',
  PROFILE_SCREEN = 'PROFILE_SCREEN',

  WEB_VIEW = 'WEB_VIEW',
}

export type RootStackParams = {
  [Routes.WELCOME_PAGE]: undefined;
  [Routes.REGISTRATION]: undefined;
  [Routes.NO_INTERNET]: undefined;

  [Routes.BOTTOM_TAB]: undefined;

  [Routes.LOG_IN_SCREEN]: undefined;
  [Routes.SIGN_UP_SCREEN]: undefined;
  [Routes.PHONE_SCREEN]: undefined;
  [Routes.CODE_SCREEN]: undefined;
  [Routes.EMAIL_SUCCESS_VERIFICATION_SCREEN]: undefined;
  [Routes.CREATE_PASSWORD_SCREEN]: undefined;

  [Routes.FEEDBACK_SUCCESS]: undefined;
  [Routes.PROFILE_SCREEN]: undefined;
  [Routes.PROFILE_ACTIONS_SCREEN]: {type: 'feedback' | 'deleteAccount'};
  [Routes.PROFILE_NAVIGATOR]:
    | undefined
    | {
        screen: keyof RootStackParams;
        params?: RootStackParams[keyof RootStackParams];
      };

  [Routes.WEB_VIEW]: {url: string};
};
