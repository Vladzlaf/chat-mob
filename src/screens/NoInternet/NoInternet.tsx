import NoInternetIcon from '@assets/svg/NoInternetIcon';
import {Button} from '@components/Button';
import {GradientWrapper} from '@hocs/GradientWrapper';
import {MainPaddingWrapper} from '@hocs/MainPaddingWrapper';
import {useNetInfo} from '@react-native-community/netinfo';
import useNavigation from '@utils/hooks/useNavigation';
import createStyles from '@utils/styles/createStyles';
import {commonColors} from '@utils/styles/themeConstants';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';

export const NoInternet = () => {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const {t} = useTranslation();
  const handleTryAgain = useCallback(() => {
    if (netInfo.isConnected) goBack();
  }, [dispatch, goBack]);
  return (
    <GradientWrapper gradientColors={commonColors.gradientLightGreen}>
      <MainPaddingWrapper style={styles.container}>
        <NoInternetIcon />
        <Text style={styles.title}>{t('errors.lostConnection')}</Text>
        <Text style={styles.subtitle}>
          {t('errors.lostConnectionDescription')}
        </Text>
        <Button
          style={styles.button}
          onPress={handleTryAgain}
          label={t('errors.tryAgain')}
        />
      </MainPaddingWrapper>
    </GradientWrapper>
  );
};

const styles = createStyles(({colors, fonts}) => ({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
    color: colors.lightBlack,
    fontFamily: fonts.main400,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    color: colors.lightBlack,
    fontFamily: fonts.main600,
  },
  button: {
    marginTop: 32,
    width: '60%',
  },
}));
