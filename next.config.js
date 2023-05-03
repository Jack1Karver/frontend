const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
