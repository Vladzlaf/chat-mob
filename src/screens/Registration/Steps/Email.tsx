import {Button, FloatingTextInput, JoinUs, TermsCheckbox} from '@components';
import {Routes} from '@navigation/routes';
import {AuthService} from '@utils/API/AuthService';
import {getTranslationKeyForError} from '@utils/helpers/getTranslationKeyForError';
import useNavigation from '@utils/hooks/useNavigation';
import createStyles from '@utils/styles/createStyles';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {emailValidationSchema} from './validation';
import {termsData} from '@utils/helpers/constants';
import {KeyboardAvoidingWrapper} from '@hocs/KeyboardAvoidingWrapper';
import {useDispatch, useSelector} from 'react-redux';

import i18n from '@i18n/i18n';
import {selectAuthLoading} from '@store/authentication/authSelectors';
import {setConsentGiven, setNonMandatoryAccepted} from '@store/user/userSlice';
import Toast from 'react-native-toast-message';

type AcceptedTerms = {
  [key: string]: boolean;
};

type Props = {
  onNextStep: () => void;
  setRegistrationEmail: (email: string) => void;
  registrationEmail: string;
  title?: string;
  isReset?: boolean;
  withTerms?: boolean;
};

export const Email: React.FC<Props> = ({
  onNextStep,
  setRegistrationEmail,
  registrationEmail,
  isReset,
  withTerms,
}) => {
  const [email, setEmail] = useState<string>(registrationEmail);
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  useEffect(() => {
    setErrorKey(null);
  }, [email]);
  const [loading, setIsLoading] = useState(false);
  const isLoading = useSelector(selectAuthLoading);
  console.log('loading', isLoading);

  const [acceptedTerms, setAcceptedTerms] = useState<AcceptedTerms>({});

  const handleCheckboxChange = (termId: string, value: boolean) => {
    setAcceptedTerms({...acceptedTerms, [termId]: value});
  };

  const calculateAllMandatoryAccepted = () => {
    return termsData
      .filter(term => term.mandatory)
      .every(term => acceptedTerms[term.id]);
  };

  useEffect(() => {
    const allMandatoryAccepted = calculateAllMandatoryAccepted();
    const isEmailValid = !!email && !errorKey;
    const shouldEnableButton = isReset
      ? isEmailValid
      : isEmailValid && allMandatoryAccepted;
    setIsButtonDisabled(!shouldEnableButton);
  }, [email, errorKey, acceptedTerms]);

  const onContinue = () => {
    emailValidationSchema
      .validate({email})
      .then(() => {
        setIsLoading(true);

        const service = isReset ? AuthService.sendOtp : AuthService.signUp;

        const allMandatoryAccepted = calculateAllMandatoryAccepted();

        const nonMandatoryAccepted = termsData
          .filter(term => !term.mandatory)
          .some(term => acceptedTerms[term.id]);

        service(
          email.trim().toLowerCase(),
          allMandatoryAccepted,
          nonMandatoryAccepted,
        )
          .then(() => {
            setRegistrationEmail(email);
            dispatch(setConsentGiven(allMandatoryAccepted));
            dispatch(setNonMandatoryAccepted(nonMandatoryAccepted));
            onNextStep();
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Signup error:', error.data.message);
            const translationKey = getTranslationKeyForError(
              error.data.message,
            );
            setIsLoading(false);
            if (translationKey) {
              setErrorKey(translationKey);
            }
          });
      })
      .catch(validationError => {
        setErrorKey(validationError.message);
      });
  };

  const {t} = useTranslation();

  const {replace, goBack} = useNavigation();
  const handleNavigation = (screen: string) => {
    replace(screen as never);
  };

  const renderContent = () => {
    return (
      <>
        <Text style={styles.title}>
          {t(isReset ? 'authFlow.resetPasswordRegular' : 'authFlow.signUp')}
        </Text>
        <View style={styles.emailInputContainer}>
          <FloatingTextInput
            value={email}
            onChange={setEmail}
            placeholderText={t('authFlow.enterYourEmail')}
            labelText={t('authFlow.email')}
            keyboardType="email-address"
            enterKeyHint="next"
            errorText={errorKey ? t(errorKey) : undefined}
            onSubmitEditing={() => !isButtonDisabled && onContinue()}
          />
          {withTerms && (
            <View style={styles.termsContainer}>
              {termsData.map(term => (
                <TermsCheckbox
                  key={term.id}
                  value={acceptedTerms[term.id]}
                  onChange={value => handleCheckboxChange(term.id, value)}
                  term={term}
                />
              ))}
            </View>
          )}
        </View>
        <Button
          isLoading={loading || isLoading}
          label={t(isReset ? 'authFlow.sendCode' : 'authFlow.continue')}
          onPress={onContinue}
          disabled={isButtonDisabled || errorKey !== null}
        />
        <View style={styles.joinUsContainer}>
          <JoinUs
            regularText={!isReset ? t('authFlow.joinedUsBefore') : undefined}
            clickableText={
              isReset ? t('authFlow.backToLogIn') : t('authFlow.logIn')
            }
            isItalianLang={i18n.language === 'it'}
            onPress={
              isReset ? goBack : () => handleNavigation(Routes.LOG_IN_SCREEN)
            }
          />
        </View>
      </>
    );
  };

  return (
    <Animated.View entering={FadeIn.duration(350)}>
      {isReset ? (
        <>{renderContent()}</>
      ) : (
        <KeyboardAvoidingWrapper avoidingViewDisabled={true}>
          {renderContent()}
        </KeyboardAvoidingWrapper>
      )}
    </Animated.View>
  );
};

const styles = createStyles(({colors, fonts}) => ({
  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 35,
    fontSize: 32,
    fontFamily: fonts.secondary,
    color: colors.lightBlack,
  },
  emailInputContainer: {
    marginBottom: 35,
  },
  joinUsContainer: {
    marginTop: 30,
  },
  termsContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
}));
