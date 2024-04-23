import {combineReducers} from '@reduxjs/toolkit';
import authSlice, { AuthState } from './authentication/authSlice';


export type RootState = {
  auth: AuthState;
};

const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;
