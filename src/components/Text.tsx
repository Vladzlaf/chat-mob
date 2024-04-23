import createStyles from '@utils/styles/createStyles';
import React, { memo } from 'react';
import { Text as RNText, TextProps } from 'react-native';


const Text: React.FC<TextProps> = props => {
  return (
    <RNText {...props} style={[styles.text, props.style]}>
      {props.children}
    </RNText>
  );
};

const styles = createStyles(({ colors }) => ({
  text: {
    color: colors.text,
    fontFamily: 'Switzer-Regular',
    fontWeight: '400',
    fontSize: 16,
  },
}));

export default memo(Text);
