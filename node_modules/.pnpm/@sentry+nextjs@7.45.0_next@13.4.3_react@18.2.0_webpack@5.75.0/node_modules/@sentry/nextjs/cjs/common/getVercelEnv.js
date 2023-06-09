Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Returns an environment setting value determined by Vercel's `VERCEL_ENV` environment variable.
 *
 * @param isClient Flag to indicate whether to use the `NEXT_PUBLIC_` prefixed version of the environment variable.
 */
function getVercelEnv(isClient) {
  const vercelEnvVar = isClient ? process.env.NEXT_PUBLIC_VERCEL_ENV : process.env.VERCEL_ENV;
  return vercelEnvVar ? `vercel-${vercelEnvVar}` : undefined;
}

exports.getVercelEnv = getVercelEnv;
//# sourceMappingURL=getVercelEnv.js.map
