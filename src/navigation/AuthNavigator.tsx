import GradientHeader from '@components/GradientHeader';
import {RootStackParams, Routes} from '@navigation/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CodeScreen from '../screens/AuthStack/screens/CodeScreen';
import CreatePasswordScreen from '../screens/AuthStack/screens/CreatePasswordScreen';
import EmailSuccessVerificationScreen from '../screens/AuthStack/screens/EmailSuccessVerificationScreen';
import LogInScreen from '../screens/AuthStack/screens/LogInScreen';
import PhoneScreen from '../screens/AuthStack/screens/PhoneScreen';
import SignUpScreen from '../screens/AuthStack/screens/SignUpScreen';

const Stack = createNativeStackNavigator<RootStackParams>();
const {
  LOG_IN_SCREEN,
  SIGN_UP_SCREEN,
  PHONE_SCREEN,
  CODE_SCREEN,
  EMAIL_SUCCESS_VERIFICATION_SCREEN,
  CREATE_PASSWORD_SCREEN,
} = Routes;

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <GradientHeader />,
      }}>
      <Stack.Screen name={LOG_IN_SCREEN} component={LogInScreen} />

      <Stack.Screen name={SIGN_UP_SCREEN} component={SignUpScreen} />

      <Stack.Screen name={PHONE_SCREEN} component={PhoneScreen} />

      <Stack.Screen name={CODE_SCREEN} component={CodeScreen} />

      <Stack.Screen
        name={EMAIL_SUCCESS_VERIFICATION_SCREEN}
        component={EmailSuccessVerificationScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name={CREATE_PASSWORD_SCREEN}
        component={CreatePasswordScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
