import Axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import i18next from 'i18next';
import * as Keychain from 'react-native-keychain';
import {API_URL} from '../helpers/constants';
import Toast from 'react-native-toast-message';
import i18n from '@i18n/i18n';
import { dispatchHolder } from '@store/dispatchHolder';
import { logOut } from '@store/authentication/authSlice';
import { resetUserProfile } from '@store/user/userSlice';
import { reset } from 'react-native-track-player/lib/trackPlayer';
import { resetTheme } from '@store/theme/themeSlice';
import { disconnectSocket } from '@store/socket/socketThunks';
export class HTTPError extends Error {
  constructor(public status: number, public cause: string) {
    super(cause);
  }
}
export class BaseClient {
  private baseUrl = API_URL;
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: this.baseUrl,
    });

    this.axios.interceptors.request.use(req => {
      return req;
    });

    this.axios.interceptors.request.use(async config => {
      const currentLang = i18next.language.toUpperCase();

      if (!config.params) {
        config.params = {};
      }

      config.params.lang = currentLang;

      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          config.headers['Authorization'] = `Bearer ${credentials.password}`;
        }
      } catch (error) {
        console.warn('Failed to get credentials', error);
      }
      return config;
    });

    this.axios.interceptors.response.use(
      (data: AxiosResponse) => {
        if (data.status === 201 || data) {
          return data;
        }
        console.warn('api error', data);
        throw new Error('API Error');
      },
      (error: AxiosError) => {
        console.warn('api error', error.response);
        if (error.response?.status === 502 || error.response?.status === 500) {
          Toast.show({
            type: 'error',
            props: {
              message: i18n.t('errors.serverError'),
            },
          });
          throw new HTTPError(502, 'Bad Gateway Error');
        }
 if (error.response?.status === 401) {
    dispatchHolder.safeDispatch([
      logOut(),
      resetUserProfile(),
      reset(),
      resetTheme(),
      disconnectSocket(),
    ]);
 }

        throw error.response;
      },
    );
  }

  setAccessToken = (token: string) => {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  get = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> => {
    return this.axios.get(url, {
      params: data,
    });
  };

  delete = async <T>(url: string): Promise<AxiosResponse<T>> => {
    return this.axios.delete(url);
  };

  post = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> => {
    return this.axios.post(url, data);
  };

  patch = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> => {
    return this.axios.patch(url, data);
  };
  put = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> => {
    return this.axios.put(url, data);
  };
}

export const baseApiClient = new BaseClient();
