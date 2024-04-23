import { RootState } from "@store/rootReducer";


export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsProfileComplete = (state: RootState) =>
  state.auth.isProfileComplete;
export const selectHasCheckedProfileCompletion = (state: RootState) =>
  state.auth.hasCheckedProfileCompletion;
