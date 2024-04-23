import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

const useAppStatus = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subAppState = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });
    return () => {
      if (subAppState) {
        subAppState.remove();
      }
    };
  }, []);

  return appState;
};

export default useAppStatus;
