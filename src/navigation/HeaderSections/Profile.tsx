import ProfileIcon from '@assets/svg/ProfileIcon';
import {Routes} from '@navigation/routes';
import { RootState } from '@store/types';
import {hideKeyboard} from '@utils/helpers/keyboard';
import useNavigation from '@utils/hooks/useNavigation';
import useTheme from '@utils/hooks/useTheme';
import createStyles from '@utils/styles/createStyles';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
const Profile = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();
const theme = useSelector((state: RootState) => state.theme.userTheme);
  const goToProfile = () => {
    hideKeyboard();
    navigate(Routes.PROFILE_NAVIGATOR);
  };

  return (
    <TouchableOpacity
      onPress={goToProfile}
      style={[styles.container, {backgroundColor: colors.secondary}]}>
      <ProfileIcon color={theme==='darkGreen'?colors.myMessageText: colors.main} />
    </TouchableOpacity>
  );
};

export default Profile;

const styles = createStyles(() => ({
  container: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
  },
}));
