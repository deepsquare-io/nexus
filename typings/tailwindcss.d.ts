declare module 'tailwindcss/resolveConfig' {
  import type { Config } from 'tailwindcss';

  function resolveConfig(config: any): Config;

  export = resolveConfig;
}
