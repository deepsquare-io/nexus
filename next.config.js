const { withSentryConfig } = require('@sentry/nextjs');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const test = process.env.NEXT_PUBLIC_APP_ENV === 'test';
const analyse = process.env.NEXT_BUILD_ANALYZE === 'true';
const debug = process.env.NEXT_BUILD_DEBUG === 'true';

/** @type {import('next').NextConfig} */
let config = {
  reactStrictMode: true,
  // swcMinify: true, // 7x faster than Terser
  eslint: {
    ignoreDuringBuilds: test || analyse,
    dirs: ['src', 'typings'],
  },
  typescript: {
    ignoreBuildErrors: test || analyse,
  },
  images: {
    domains: ['transfer.deepsquare.run'],
  },
  productionBrowserSourceMaps: true,
  experimental: { serverComponentsExternalPackages: ['mongoose'] },
  webpack: (config, { buildId, isServer }) => {
    config.plugins.forEach((plugin) => {
      if (plugin.constructor.name === 'DefinePlugin') {
        plugin.definitions = {
          ...plugin.definitions,
          'process.env.APP_RELEASE': JSON.stringify(buildId),
          'process.env.NEXT_PUBLIC_APP_RELEASE': JSON.stringify(buildId),
        };

        process.env.SENTRY_RELEASE = buildId;
      }
    });

    if (debug) {
      config.optimization.minimize = false;
    }
    config.experiments = { ...config.experiments, topLevelAwait: true };
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['yaml'],
          filename: 'static/[name].worker.js',
          customLanguages: [
            {
              label: 'yaml',
              entry: 'monaco-yaml',
              worker: {
                id: 'monaco-yaml/yamlWorker',
                entry: 'monaco-yaml/yaml.worker',
              },
            },
          ],
        }),
      );
    }
    return config;
  },
};

try {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: analyse,
  });
  config = withBundleAnalyzer(config);
} catch (_) {}

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  config = withSentryConfig(config, { silent: true }, { hideSourceMaps: true });
}

module.exports = config;
