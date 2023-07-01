# next-known-env

example/possible usage:

```ts
import { getEnvOrThrowPermitEmpty, getPort, isLocalhost } from './env';

/**
 * Canonically,
 * - production:  example.com
 * - preview:     *.vercel.app
 * - development: localhost:3000
 */
export function websiteHostname() {
  return getEnvOrThrowPermitEmpty('VERCEL_URL') || `localhost:${getPort()}`;
}

/**
 * Canonically,
 * - production:  https://example.com
 * - preview:     https://*.vercel.app
 * - development: http://localhost:3000
 */
export function websiteUrl() {
  return (isLocalhost() ? 'http' : 'https') + '://' + websiteHostname();
}
```
