import ErrorIcon from '@assets/svg/ErrorIcon';
import {Button, JoinUs} from '@components';
import Text from '@components/Text';
import i18n from '@i18n/i18n';
import {AuthService} from '@utils/API/AuthService';
import {getTranslationKeyForError} from '@utils/helpers/getTranslationKeyForError';
import useInterval from '@utils/hooks/useInterval';
import useTheme from '@utils/hooks/useTheme';
import createStyles from '@utils/styles/createStyles';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

import OTPTextInput from 'react-native-otp-textinput';
import Animated, {FadeIn} from 'react-native-reanimated';

type Props = {
  onNextStep: () => void;
  registrationEmail: string;
};

export const Code: React.FC<Props> = ({onNextStep, registrationEmail}) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [otp, setOtp] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [resendCount, setResendCount] = useState(0);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    setErrorKey(null);
  }, [otp]);

  useEffect(() => {
    setIsButtonDisabled(!otp);
  }, [otp]);

  useEffect(() => {
    if (resendCount > 0) {
      AuthService.sendOtp(registrationEmail.toLowerCase())
        .then(response => {
          console.log('OTP sent successfully:', response);
        })
        .catch(error => {
          console.error('Error sending OTP:', error.response || error);
        });
    }
  }, [resendCount]);

  const decrementTimeLeft = () => {
    setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
  };

  useInterval(decrementTimeLeft, timeLeft > 0 ? 1000 : null);

  const handleResend = () => {
    setTimeLeft(60);
    setResendCount(prev => prev + 1);
  };

  const renderTime = () => {
    const time = new Date(0, 0, 0, 0, 0, timeLeft, 0);
    return format(time, 'mm:ss');
  };

  const onContinue = () => {
    setIsLoading(true);
    AuthService.verifyOtp(registrationEmail.toLowerCase(), otp)
      .then(() => {
        onNextStep();
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error.data.message);
        setIsLoading(false);
        const translationKey =
          getTranslationKeyForError(error.data.message) ??
          'errors.otpIsIncorrect';
        if (translationKey) {
          setErrorKey(translationKey);
        }
      });
  };

  const {t} = useTranslation();

  const {colors} = useTheme();
  return (
    <Animated.View entering={FadeIn.duration(350)}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{t('authFlow.enterTheCode')}</Text>
        <View>
          <Text style={styles.descriptionTop}>
            {`${t('authFlow.verificationCode')} ${registrationEmail}. ${t(
              'authFlow.spamVerification')}`}
          </Text>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <OTPTextInput
          handleTextChange={text => setOtp(text)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          tintColor={errorKey !== null ? colors.lightRed : colors.greenOtp}
          inputCount={4}
          keyboardType="numeric"
        />
      </View>
      {errorKey !== null && (
        <View style={styles.errorContainer}>
          <ErrorIcon />
          <Text style={styles.errorText}>
            {errorKey ? t(errorKey) : undefined}
          </Text>
        </View>
      )}
      <View style={styles.middleContainer}>
        {timeLeft === 0 ? (
          <JoinUs
            regularText={t('authFlow.notReceiveCode')}
            clickableText={t('authFlow.resend')}
            onPress={handleResend}
            isItalianLang={i18n.language === 'it'}
          />
        ) : (
          <Text style={styles.descriptionText}>
            {t('authFlow.resendCode')} {renderTime()}
          </Text>
        )}
      </View>

      <Button
        isLoading={loading}
        disabled={isButtonDisabled || errorKey !== null}
        onPress={onContinue}
        label={t('authFlow.continue')}
      />
    </Animated.View>
  );
};

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
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.main,
    fontWeight: '400',
    color: colors.dirtyGreen,
    lineHeight: 21,
  },
  textBold: {
    fontSize: 16,
    fontFamily: fonts.main500,
    fontWeight: '500',
    color: colors.greenDark,
  },

  descriptionTop: {
    fontSize: 14,
    fontFamily: fonts.main,
    color: colors.grey,
    textAlign: 'center',
  },

  descriptionText: {
    fontSize: 15,
    fontFamily: fonts.main,
    color: colors.grey,
    textAlign: 'center',
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  con: {
    marginHorizontal: 40,
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
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginLeft: 5,
    color: colors.error,
    fontFamily: fonts.main400,
    fontWeight: '400',
    fontSize: 12,
  },
}));
