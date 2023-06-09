import resolveConfig from 'tailwindcss/resolveConfig';
import rawTailwindConfig from '../../tailwind.config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const tailwind = resolveConfig(rawTailwindConfig);

export default tailwind;
