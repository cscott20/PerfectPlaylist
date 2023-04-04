module.exports = {
  // ...other configuration options...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                ['postcss-preset-env', {
                  features: {
                    'nesting-rules': true,
                    'custom-properties': true,
                  },
                  stage: 3,
                }],
              ],
            },
          },
        }],
      },
    ],
  },
};

