import useTheme from '@utils/hooks/useTheme';
import createStyles from '@utils/styles/createStyles';
import React from 'react';
import {Platform, StatusBar, NativeModules} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type GradientWrapperProps = {
  children: React.ReactNode;
  gradientColors?: string[];
};

export const GradientWrapper: React.FC<GradientWrapperProps> = ({
  children,
  gradientColors,
}) => {
  const {StatusBarManager} = NativeModules;
  const insets = useSafeAreaInsets();
  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios'
      ? 0
      : Math.max(insets.top, StatusBarManager.HEIGHT + 20 || 0);
  const {colors} = useTheme();

  return (
    <LinearGradient
      colors={gradientColors ?? colors.gradientGreen}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[
        styles.container,
        Platform.OS === 'android' && {paddingTop: STATUSBAR_HEIGHT},
      ]}>
      {children}
    </LinearGradient>
  );
};

const styles = createStyles(() => ({
  container: {
    flex: 1,
  },
}));
