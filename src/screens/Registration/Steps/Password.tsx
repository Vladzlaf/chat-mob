import {Button, FloatingTextInput} from '@components';

import {AuthService} from '@utils/API/AuthService';
import createStyles from '@utils/styles/createStyles';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {ValidationError} from 'yup';
import {passwordValidationSchema} from '../validation';
import { setToken } from '@store/authentication/authSlice';
type Props = {
  onNextStep: () => void;
  isReset?: boolean;
  registrationEmail: string;
};

export const Password: React.FC<Props> = ({
  onNextStep,
  isReset,
  registrationEmail,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const passwordValidation = (password: string) => {
    try {
      passwordValidationSchema.validateSync({password});
      return null;
    } catch (error) {
      if (error instanceof ValidationError) {
        return error.errors[0];
      }
    }
  };

  useEffect(() => {
    setPasswordErrorMessage('');
    setConfirmPasswordErrorMessage('');
  }, [password, confirmPassword]);

  const checkPasswords = async () => {
    let hasError = false;

    const passwordError = passwordValidation(password);
    if (passwordError) {
      setPasswordErrorMessage(t(passwordError));
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordErrorMessage(t('errors.passwordDoNotMatch'));
      hasError = true;
    }

    setIsButtonDisabled(hasError);

    if (hasError) {
      return;
    }
    if (!hasError) {
      setIsLoading(true);
      if (isReset) {
        AuthService.resetPassword(
          registrationEmail.toLowerCase(),
          password,
          confirmPassword,
        )
          .then(() => {
            onNextStep();
          })
          .catch(error => {
            console.error('Signup error:', error.response || error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        AuthService.createPassword(registrationEmail.toLowerCase(), password, confirmPassword)
          .then(res => {
            const token = res.data.access_token;
            dispatch(setToken(token));
            onNextStep();
          })
          .catch(err => {
            console.log('err', err.data.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    setIsButtonDisabled(password.length === 0 || confirmPassword.length === 0);
  }, [password, confirmPassword]);

  const {t} = useTranslation();

  const confirmPasswordInputRef = React.useRef<any>(null);
  const onPasswordSubmit = () => {
    confirmPasswordInputRef.current?.focus();
  };

  return (
    <Animated.View entering={FadeIn.duration(350)}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{t('authFlow.createPassword')}</Text>
        <Text style={styles.descriptionText}>
          {t('authFlow.passwordRules')}
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <FloatingTextInput
          value={password}
          onChange={setPassword}
          placeholderText={t('authFlow.createPassword')}
          labelText={t('authFlow.password')}
          enterKeyHint="next"
          isSecure
          errorText={t(passwordErrorMessage)}
          onSubmitEditing={onPasswordSubmit}
        />
        <FloatingTextInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholderText={t('authFlow.confirmPasswordLower')}
          labelText={t('authFlow.confirmPasswordLower')}
          enterKeyHint="done"
          isSecure
          errorText={t(confirmPasswordErrorMessage)}
          onSubmitEditing={checkPasswords}
          ref={confirmPasswordInputRef}
        />
      </View>
      <Button
        isLoading={isLoading}
        disabled={isButtonDisabled}
        onPress={checkPasswords}
        label={isReset ? t('authFlow.createPassword') : t('authFlow.signUp')}
      />
    </Animated.View>
  );
};

export default Password;

const styles = createStyles(({colors, fonts}) => ({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.secondary,
    color: colors.lightBlack,
    marginTop: 20,
    marginBottom: 38,
  },
  descriptionText: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: fonts.main,
    fontWeight: '400',
    lineHeight: 21,
    color: colors.grey,
    textAlign: 'center',
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 45,
    gap: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    width: '100%',
  },
  roundedTextInput: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    width: 45,
    height: 45,
    textAlign: 'center',
  },
  resendText: {
    fontSize: 16,
    fontFamily: fonts.main,
    color: colors.lightBlack,
    marginTop: 20,
  },
}));
