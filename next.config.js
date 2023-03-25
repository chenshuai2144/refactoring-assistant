const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['json', 'less', 'javascript', 'typescript', 'css'],
      })
    );
    return config;
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
