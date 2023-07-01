export type KnownEnvVar = NodeBuiltinEnvVar | VercelEnvVar | MyEnvVar;

export function getEnvOrThrow(env: KnownEnvVar): string {
  const value = process.env[env];
  if (value === undefined) {
    throw new Error(
      `Env var [${env}] expected to be set (to a non-empty string)`,
    );
  }
  if (value.length === 0) {
    throw new Error(`Env var [${env}] expected to be non-empty`);
  }
  return value;
}

export function getEnvOrThrowPermitEmpty(env: KnownEnvVar): string {
  const value = process.env[env];
  if (value === undefined) {
    throw new Error(`Env var [${env}] expected to be set`);
  }
  return value;
}

export function getVercelEnv(): VercelEnvironment {
  const value = getEnvOrThrow('VERCEL_ENV') as VercelEnvironment;
  if (!VERCEL_ENVIRONMENTS.includes(value)) {
    throw new Error(
      `VERCEL_ENV must be one of ${VERCEL_ENVIRONMENTS.join(', ')}`,
    );
  }
  return value;
}

export function isLocalhost(): boolean {
  return getVercelEnv() === 'development';
}

export function getPort(): number {
  const portStr = getEnvOrThrow('PORT');
  const port = parseInt(portStr, 10);
  if (isNaN(port)) {
    throw new Error(`Expected PORT to be a number, got [${portStr}]`);
  }
  return port;
}

/**
 * We don't care for NODE_ENV given we have VERCEL_ENV (which is default '') when using vercel.
 */
type NodeBuiltinEnvVar = 'PORT';

type VercelEnvVar =
  | 'ENABLE_EXPERIMENTAL_COREPACK'
  | 'NX_DAEMON'
  | 'TURBO_REMOTE_ONLY'
  | 'TURBO_RUN_SUMMARY'
  | 'VERCEL'
  | 'VERCEL_ENV'
  | 'VERCEL_GIT_COMMIT_AUTHOR_LOGIN'
  | 'VERCEL_GIT_COMMIT_AUTHOR_NAME'
  | 'VERCEL_GIT_COMMIT_MESSAGE'
  | 'VERCEL_GIT_COMMIT_REF'
  | 'VERCEL_GIT_COMMIT_SHA'
  | 'VERCEL_GIT_PREVIOUS_SHA'
  | 'VERCEL_GIT_PROVIDER'
  | 'VERCEL_GIT_PULL_REQUEST_ID'
  | 'VERCEL_GIT_REPO_ID'
  | 'VERCEL_GIT_REPO_OWNER'
  | 'VERCEL_GIT_REPO_SLUG'
  | 'VERCEL_URL';

type MyEnvVar =
  | 'MY_VAR'
  | 'NEXT_PUBLIC_<MY_PUBLIC_VAR>';

const VERCEL_ENVIRONMENTS = ['production', 'preview', 'development'] as const;

type VercelEnvironment = (typeof VERCEL_ENVIRONMENTS)[number];
