import {RootStackParams, Routes} from '@navigation/routes';
import {useNavigation as useNavigationDefault} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const useNavigation = () => {
  const {
    navigate,
    goBack: goBackDefault,
    reset: resetDefault,
    replace: replaceDefault,
    setOptions,
  } = useNavigationDefault<NativeStackNavigationProp<RootStackParams>>();

  const goBack = () => {
    goBackDefault();
  };

  const reset = (screen: Routes) => {
    resetDefault({
      routes: [
        {
          key: screen,
          name: screen,
        },
      ],
    });
  };

  const replace = (screen: Routes) => {
    replaceDefault(screen);
  };

  return {navigate, goBack, reset, replace, setOptions};
};

export default useNavigation;
