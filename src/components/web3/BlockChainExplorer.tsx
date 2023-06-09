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
