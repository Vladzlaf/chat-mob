import createStyles from '@utils/styles/createStyles';
import React from 'react';
import {SafeAreaView, View} from 'react-native';

type Props = {
  children: React.ReactNode;
  disableSafeArea?: boolean;
  backgroundColor?: string;
  style?: object;
  safeAreaStyle?: object;
};

export const MainPaddingWrapper: React.FC<Props> = ({
  children,
  backgroundColor,
  style,
  disableSafeArea,
  safeAreaStyle,
}) => {
  if (disableSafeArea) {
    return (
      <View style={[styles.container, {backgroundColor}, style]}>
        {children}
      </View>
    );
  }

  return (
    <SafeAreaView style={[{flex: 1}, safeAreaStyle]}>
      <View style={[styles.container, {backgroundColor}, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = createStyles(() => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 30,
    paddingBottom: 45,
  },
}));
