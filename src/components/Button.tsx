import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import createStyles from '@utils/styles/createStyles';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Loader from './Loader';

type Props = {
  isLoading?: boolean;
  label: string;
  labelStyle?: object;
  backgroundColors?: {
    active: string;
    disabled: string;
  };
  style?: object;
  disabled?: boolean;
  onPress?: () => any;
  LeftComponent?: React.ReactNode;
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Button: React.FC<Props> = React.memo(
  ({
    label,
    labelStyle,
    style,
    backgroundColors = {
      active: commonColors.greenDark,
      disabled: commonColors.btnPrimaryDisabledBackground,
    },
    onPress,
    disabled,
    isLoading,
    LeftComponent,
  }) => {
    const changeBackgroundProgress = useSharedValue(0);

    const isInitialDisabledRef = React.useRef(disabled);

    useEffect(() => {
      if (disabled) {
        changeBackgroundProgress.value = withTiming(1, {
          duration: isInitialDisabledRef.current ? 200 : 0,
        });
      } else {
        changeBackgroundProgress.value = withTiming(0, {duration: 200});
      }
    }, [disabled]);

    const animatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        changeBackgroundProgress.value,
        [0, 1],
        [backgroundColors.active, backgroundColors.disabled],
      );
      return {
        backgroundColor,
      };
    });

    return (
      <AnimatedTouchableOpacity
        activeOpacity={0.5}
        style={[styles.container, style, backgroundColors && animatedStyle]}
        onPress={onPress}
        disabled={disabled || isLoading}>
        <View style={styles.contentWrapper}>
          {LeftComponent && (
            <View style={styles.leftComponentWrapper}>{LeftComponent}</View>
          )}
          {isLoading ? (
            <Loader size={30} color="white" />
          ) : (
            <Text style={[styles.label, labelStyle]}>{label}</Text>
          )}
        </View>
      </AnimatedTouchableOpacity>
    );
  },
);

const styles = createStyles(({colors}) => ({
  container: {
    height: 56,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftComponentWrapper: {marginRight: 6},
  darkLoader: {
    color: colors.background,
  },
  label: {
    color: colors.text,
    fontFamily: fonts.main600,
    fontWeight: '600',
  },
  darkLabel: {
    color: colors.text,
  },
  mediumLabel: {
    color: colors.text,
  },
  errorLabel: {
    color: colors.error,
  },
}));
