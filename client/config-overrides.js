const { override } = require('customize-cra');
const cspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

const cspConfigPolicy = {
  'script-src': ["'self'", 'unsafe-inline'],
  'img-src': ["'self'", 'https://gravatar.com'],
};

function addCspHtmlWebpackPlugin(config) {
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
  }

  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebpackPlugin),
};
