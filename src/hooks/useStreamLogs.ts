import { useRouter } from 'next/navigation';
import type { Hex } from 'viem';
import { useSignMessage } from 'wagmi';
import type { Terminal } from 'xterm';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useGetJobHashQuery } from '@graphql/internal/client/generated/getJobHash.generated';
import loggerClient from '@grpc/client';
import { GRPCService } from '@grpc/service';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb2, isWeb3 } from '@lib/types/AuthMethod';

export default function useStreamLogs(
  terminal: Terminal | null,
  jobId: string,
  showTimestamp: boolean,
  download: boolean,
  handleDownload: (url: string) => void,
) {
  const { authMethod } = useContext(authContext);
  const router = useRouter();
  const { signMessageAsync: sign } = useSignMessage();
  const [dlLink, setDlLink] = useState<string | undefined>(undefined);

  const { data: jobHash } = useGetJobHashQuery({ variables: { jobId }, skip: !isWeb2(authMethod) });

  const writeToTerminal = useCallback(
    ({ data, timestamp }: { data: Uint8Array; timestamp: bigint }) => {
      if (!terminal) return;
      const decoder = new TextDecoder();
      const lineStr = decoder.decode(data);
      if (/(.*)transfer.deepsquare.run(.*)/.test(lineStr)) {
        setDlLink(lineStr);
        if (download) {
          router.back();
          handleDownload(lineStr);
        }
      }
      if (showTimestamp) {
        terminal.write(new Date(Number(timestamp / 1000000n)).toISOString() + ' ');
      }
      terminal.writeln(data);
    },
    [download, handleDownload, router, showTimestamp, terminal],
  );

  useEffect(() => {
    const grpcService = new GRPCService(loggerClient);

    if (!terminal) return;

    terminal.clear();

    let params: {
      address: Hex;
      hash: Hex;
      timestamp: number;
    };

    (async () => {
      if (isWeb3(authMethod)) {
        const timestamp = Date.now();
        const signedHash = await sign({
          message: `read:${authMethod.address.toLowerCase()}/${jobId}/${timestamp}`,
        });
        params = {
          address: authMethod.address,
          hash: signedHash,
          timestamp,
        };
      } else {
        if (!jobHash) return;
        params = {
          hash: jobHash.getJobHash.hash,
          address: jobHash.getJobHash.address,
          timestamp: parseInt(jobHash.getJobHash.timestamp),
        };
      }

      const stream = await grpcService.readAndWatch(params.address.toLowerCase(), jobId, params.hash, params.timestamp);

      for await (const res of stream) {
        writeToTerminal(res);
      }
    })().catch(console.error);
  }, [authMethod, jobHash, jobId, sign, terminal, writeToTerminal]);

  if (!terminal) return;

  return dlLink;
}
