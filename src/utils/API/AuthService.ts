import {AxiosResponse} from 'axios';
import {baseApiClient} from './baseClient';

import {API_ENDPOINTS} from './ApiConsts';

interface SignupSuccessResponse {
  user: {
    id: string;
    email: string;
  };
}

interface OtpSuccessResponse {
  message: string; 
}

interface VerifyOtpSuccessResponse {
  verified: boolean; 
}

interface CreatePasswordSuccessResponse {
  access_token: string;
  user: {
    id: string; 
  };
}

interface ResetPasswordSuccessResponse {
  success: boolean; 
}

interface LoginSuccessResponse {
  access_token: string;
}

export class AuthService {
  static async signUp(
    email: string,
    isConsentGiven?: boolean,
    isAgreedForPromotional?: boolean,
  ): Promise<AxiosResponse<SignupSuccessResponse>> {
    const data = {email, isConsentGiven, isAgreedForPromotional};
    return baseApiClient.post(API_ENDPOINTS.SIGNUP, data);
  }
  static async sendOtp(
    email: string,
  ): Promise<AxiosResponse<OtpSuccessResponse>> {
    const data = {email};
    return baseApiClient.post(API_ENDPOINTS.SEND_OTP, data);
  }
  static async verifyOtp(
    email: string,
    code: string,
  ): Promise<AxiosResponse<VerifyOtpSuccessResponse>> {
    const data = {email, code};
    return baseApiClient.post(API_ENDPOINTS.VERIFY_OTP, data);
  }
  static async createPassword(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<AxiosResponse<CreatePasswordSuccessResponse>> {
    const data = {email, password, confirmPassword};
    return baseApiClient.post(API_ENDPOINTS.CREATE_PASSWORD, data);
  }
  static async resetPassword(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<AxiosResponse<ResetPasswordSuccessResponse>> {
    const data = {email, password, confirmPassword};
    return baseApiClient.put(API_ENDPOINTS.RESET_PASSWORD, data);
  }
  static async logIn(
    email: string,
    password: string,
  ): Promise<AxiosResponse<LoginSuccessResponse>> {
    const data = {email, password};
    return baseApiClient.post(API_ENDPOINTS.LOGIN, data);
  }
}
