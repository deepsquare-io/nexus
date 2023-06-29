import NextLink from 'next/link';
import type { LinkProps } from '@mui/material/Link';
import Link from '@mui/material/Link';

function CustomLink({ href, target, ref, ...props }: LinkProps) {
  if (!href) return null;
  return (
    <NextLink href={href} target={target} passHref legacyBehavior>
      <Link ref={ref} {...props} />
    </NextLink>
  );
}

export default CustomLink;
