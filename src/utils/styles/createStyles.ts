import {StyleSheet} from 'react-native';

import {themeController} from './themeController';
import {ThemeStylesType} from './types';

const createStyles = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  styleCreator: (arg: ThemeStylesType) => T | StyleSheet.NamedStyles<T>,
) => {
  return StyleSheet.create(styleCreator(themeController.getStyleConfig()));
};

export default createStyles;
