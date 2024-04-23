import {ReturnBackTopSection} from '@components';
import {KeyboardAvoidingWrapper, MainPaddingWrapper} from '@hocs';
import {Routes} from '@navigation/routes';
import {Code, Email, Password, SuccessVerification} from './Steps';

import useNavigation from '@utils/hooks/useNavigation';
import useTheme from '@utils/hooks/useTheme';
import createStyles from '@utils/styles/createStyles';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

const REGISTRATION_STEPS = {
  EMAIL: 0,
  CODE: 1,
  SUCCESS_VERIFICATION: 2,
  PASSWORD: 3,
};

export const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(REGISTRATION_STEPS.EMAIL);
  const [registrationEmail, setRegistrationEmail] = useState('');

  const onNextStep = () => {
    if (currentStep < Object.keys(REGISTRATION_STEPS).length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const {colors} = useTheme();
  const {replace, setOptions} = useNavigation();
  const handleNavigation = (screen: string) => {
    replace(screen as never);
  };

  useEffect(() => {
    if (currentStep === REGISTRATION_STEPS.PASSWORD) {
      setOptions({
        gestureEnabled: false,
      });
    } else {
      setOptions({
        gestureEnabled: true,
      });
    }
  }, [currentStep, setOptions]);

  const renderStep = () => {
    switch (currentStep) {
      case REGISTRATION_STEPS.EMAIL:
        return (
          <Email
            onNextStep={onNextStep}
            registrationEmail={registrationEmail.toLowerCase()}
            setRegistrationEmail={setRegistrationEmail}
            withTerms
          />
        );
      case REGISTRATION_STEPS.CODE:
        return (
          <Code onNextStep={onNextStep} registrationEmail={registrationEmail} />
        );
      case REGISTRATION_STEPS.PASSWORD:
        return (
          <Password
            onNextStep={() => handleNavigation(Routes.ONBOARDING_SCREEN)}
            registrationEmail={registrationEmail.toLowerCase()}
          />
        );
      case REGISTRATION_STEPS.SUCCESS_VERIFICATION:
        return <SuccessVerification onNextStep={onNextStep} />;
      default:
        return null;
    }
  };
  if (currentStep === REGISTRATION_STEPS.EMAIL) {
    return (
      <MainPaddingWrapper disableSafeArea backgroundColor={colors.dirtyWhite}>
        <View style={styles.topBarContainer}>
          {currentStep === REGISTRATION_STEPS.CODE && (
            <ReturnBackTopSection onPress={onPrevStep} />
          )}
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>{renderStep()}</View>
      </MainPaddingWrapper>
    );
  } else {
    return (
      <KeyboardAvoidingWrapper
        keyboardVerticalOffset={50}
        style={styles.wrapper}>
        <MainPaddingWrapper disableSafeArea backgroundColor={colors.dirtyWhite}>
          <View style={styles.topBarContainer}>
            {currentStep === REGISTRATION_STEPS.CODE && (
              <ReturnBackTopSection onPress={onPrevStep} />
            )}
          </View>
          <View style={styles.stepContainer}>{renderStep()}</View>
        </MainPaddingWrapper>
      </KeyboardAvoidingWrapper>
    );
  }
};

const styles = createStyles(({colors, fonts}) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    flexGrow: 1,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
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
  termsContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
  },
}));
