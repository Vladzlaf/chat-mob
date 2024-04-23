import SuccessIcon from '@assets/svg/SuccessIcon';
import {Button} from '@components';
import Successful from '@components/Successful';
import createStyles from '@utils/styles/createStyles';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

type Props = {
  onNextStep: () => void;
};

export const SuccessVerification: React.FC<Props> = ({onNextStep}) => {
  const {t} = useTranslation();

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <View style={styles.topContainer}>
        <Successful
          Icon={SuccessIcon}
          title={t('authFlow.verified')}
          description={t('authFlow.emailAddressVerified')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={onNextStep}
          label={t('authFlow.createPassword')}></Button>
      </View>
    </Animated.View>
  );
};

const styles = createStyles(({colors, fonts}) => ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  topContainer: {
    flex: 1,

  },
  buttonContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.secondary,
    color: colors.lightBlack,
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: fonts.main,
    color: colors.grey,
    textAlign: 'center',
  },
}));
