const { alias } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
  alias({
    '@root': '.',
    '@utils': 'src/utils',
    '@components': 'src/components',
    '@constants': 'src/constants',
    '@actions': 'src/store/actions',
    '@globalStyles': 'src/styles/',
    '@api': 'src/api',
    '@assets': 'src/assets',
    '@player': 'src/components/Player',
    '@services': 'src/services',
    '@pages': 'src/pages'
  })(config);

  return config;
}
