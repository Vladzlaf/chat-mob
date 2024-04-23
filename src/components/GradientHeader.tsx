import useTheme from '@utils/hooks/useTheme';
import createStyles from '@utils/styles/createStyles';
import React from 'react';
import {Platform, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientHeader: React.FC = () => {
  const {colors} = useTheme();

  return (
    <LinearGradient
      colors={colors.gradientGreen}
      style={[styles.container, Platform.OS === 'android' && {height: 44}]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.headerContent}></View>
    </LinearGradient>
  );
};

const styles = createStyles(() => ({
  container: {
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
    height: '100%',
  },
}));

export default GradientHeader;
