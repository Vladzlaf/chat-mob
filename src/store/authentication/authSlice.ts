import {createSlice} from '@reduxjs/toolkit';
import {authenticateUser} from '@store/authentication/authThunks';
import * as Keychain from 'react-native-keychain';

export type AuthUser = {
  email: string;
  password: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error?: string | null;
  isProfileComplete: boolean;
  hasCheckedProfileCompletion: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  isProfileComplete: false,
  hasCheckedProfileCompletion: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.isProfileComplete = false;
      state.hasCheckedProfileCompletion = false;
      Keychain.resetGenericPassword();
    },
    setToken(state, action) {
      state.token = action.payload;
      Keychain.setGenericPassword('userToken', action.payload);
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setHasCheckedProfileCompletion(state, action) {
      state.hasCheckedProfileCompletion = action.payload;
    },
    setIsUserCompletedProfile(state, action) {
      const {isProfileComplete, token} = action.payload;
      state.isProfileComplete = isProfileComplete;

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
    setIsLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authenticateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.token = null;
        state.isProfileComplete = false;
        state.hasCheckedProfileCompletion = false;
      });
  },
});

export const {
  logOut,
  setToken,
  setIsAuthenticated,
  setIsUserCompletedProfile,
  setHasCheckedProfileCompletion,
  setIsLoading,
} = authSlice.actions;

export default authSlice.reducer;
