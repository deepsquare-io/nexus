// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { ComponentPropsWithoutRef, FC } from 'react';
import CustomLink from '@components/routing/Link';
import { deepsquareChain } from '@lib/web3/constants/chains';
import { Credit } from '@lib/web3/constants/tokens';
import Token from '@lib/web3/lib/Token';

interface BlockChainExplorerProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'target' | 'rel'> {
  address: string;
  token: Token;
}

export function getBlockChainUrl(address: string, token: Token) {
  const explorer = deepsquareChain.blockExplorers.default.url;
  let href = explorer.replace(/\/+$/, '');

  switch (token) {
    case Token.NATIVE:
      href += `/address/${address}`;
      break;
    case Token.CREDIT:
      href += `/token/${Credit.address}?a=${address}`;
      break;
  }

  return href;
}

const BlockChainExplorer: FC<BlockChainExplorerProps> = ({ address, token, ...props }) => {
  return <CustomLink href={getBlockChainUrl(address, token)} {...props} />;
};

export default BlockChainExplorer;
