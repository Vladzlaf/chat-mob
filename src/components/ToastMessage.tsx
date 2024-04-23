import createStyles from '@utils/styles/createStyles';
import React, {memo} from 'react';
import {View} from 'react-native';
import ToastDefault from 'react-native-toast-message';
import Text from './Text';
import ErrorIcon from '@assets/svg/ErrorIcon';

type Types = {
  type: 'success' | 'error';
};

type Props = {
  message: string;
};

export const toastConfig = {
  success: (props: {props: Props}) => (
    <ToastComponent {...props.props} type={'success'} />
  ),

  error: (props: {props: Props}) => (
    <ToastComponent {...props.props} type={'error'} />
  ),
};

const ToastComponent: React.FC<Props & Types> = memo(({message, type}) => {

  return (
    <View style={[styles.container, type === 'error' && styles.errorContainer]}>
      <ErrorIcon />

      <Text style={styles.text}>{message}</Text>
    </View>
  );
});

const styles = createStyles(({colors}) => ({
  container: {
    width: '80%',
    height: 60,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.success,
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: colors.errorToast,

    borderWidth: 1,
    borderColor: colors.red,
  },

  text: {
    fontSize: 16,

    marginLeft: 10,
    color: colors.lightBlack,
  },
}));

const Toast = {
  show: (props: Props & Types) => {
    ToastDefault.show({
      type: props.type,
      props: {
        message: props.message,
      },
    });
  },
};

export default Toast;
