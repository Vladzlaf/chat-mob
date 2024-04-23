module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    // env: {
    //   production: {
    //     plugins: ['react-native-paper/babel'],
    //   },
    // },
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@root': './',
            '@assets': './src/assets',
            '@components': './src/components',
            '@i18n': './src/i18n',
            '@modals': './src/modals',
            '@navigation': './src/navigation',
            '@hocs': './src/utils/hocs',
            '@screens': './src/screens',
            '@enums': './src/enums',
            '@store': './src/store',
            '@utils': './src/utils',
            '@context': './src/context',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
