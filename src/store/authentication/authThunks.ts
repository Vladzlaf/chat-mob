import {createAsyncThunk} from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import { AuthService } from '@utils/API/AuthService';
import { UserService } from '@utils/API/UserService';
import { AuthUser, setHasCheckedProfileCompletion, setIsUserCompletedProfile } from './authSlice';
import { UserProfile } from '@store/user/userSlice';

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({email, password}: AuthUser, {dispatch, rejectWithValue}) => {
    try {
      const response = await AuthService.logIn(
        email.trim().toLowerCase(),
        password,
      );
      const token = response.data.access_token;
      await Keychain.setGenericPassword('userToken', token);

      const {data} = await UserService.getUser();
      const {fullname, birthday} = data as UserProfile;
      const isProfileComplete = !!(
        fullname &&
        birthday &&
      );

      dispatch(setIsUserCompletedProfile({isProfileComplete, token}));
      dispatch(setHasCheckedProfileCompletion(true));
      return token;
    } catch (error) {
      if (error.data.message) {
        return rejectWithValue(error.data.message);
      }
      return rejectWithValue({message: 'An unexpected error occurred'});
    }
  },
);
