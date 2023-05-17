const path = require('path')
const withTM = require('next-transpile-modules')(['@tonclient/lib-web']);
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
module.exports = [withTM].reduce((acc, next) => next(acc), {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        // test: /\.(js|ts)x?$/,
        // for webpack 5 use
        and: [/\.(js|ts)x?$/],
      },
      use: ['@svgr/webpack'],
    });

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules/@tonclient/lib-web/tonclient.wasm'),
            to: path.join(__dirname, 'public/'),
            force: true,
          },
        ],
      })
    );

    return config
  },
  
  reactStrictMode: true,
  sassOptions:{
    includePaths: [path.join(__dirname, './src/resources/styles')],
    prependData: `
    @import "mixins";
    @import "variables";
    `,
  }
})
