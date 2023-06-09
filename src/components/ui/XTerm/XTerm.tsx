import dynamic from 'next/dynamic';

const XTerm = dynamic(() => import('./XTerm_UNSAFE_SSR'), { ssr: false });

export default XTerm;
