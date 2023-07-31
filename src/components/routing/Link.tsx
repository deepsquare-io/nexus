// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
