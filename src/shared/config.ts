import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

function getEnvironmentVariable(varName: string, fallback: string) {
  if (process?.env[varName]) {
    return process.env[varName];
  }

  if (publicRuntimeConfig[varName]) {
    return publicRuntimeConfig[varName];
  }

  return fallback;
}

export const HTTP_HOST = getEnvironmentVariable(
  'HTTP_HOST',
  'http://localhost:3000',
);
