import {toastConfig} from '@components/ToastMessage';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import RootNavigator from '@navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from '@store/store';
import {navigationService} from '@utils/services/navigationService';
import 'intl-pluralrules';
import type {FC} from 'react';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import './i18n/i18n';

import {TrackPlayerProvider} from './context/TrackPlayerContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TrackPlayerProvider>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer ref={navigationService.setNavigationRef}>
                <RootNavigator />
                <Toast config={toastConfig} />
              </NavigationContainer>
            </PersistGate>
          </Provider>
        </BottomSheetModalProvider>
      </TrackPlayerProvider>
    </GestureHandlerRootView>
  );
};

export default App;
