import { useRouter } from 'next/navigation';
import { useSignMessage } from 'wagmi';
import type { Terminal } from 'xterm';
import { useContext, useRef, useState } from 'react';
import { useChannel } from '@ably-labs/react-hooks';
import { useStartStreamJobLogsQuery } from '@graphql/internal/client/generated/startStreamJobLogs.generated';
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
  const signRef = useRef<{ hash: `0x${string}`; timestamp: number }>();
  const router = useRouter();
  const { signMessageAsync: sign } = useSignMessage();
  const [dlLink, setDlLink] = useState<string | undefined>(undefined);

  const { data: started } = useStartStreamJobLogsQuery({ variables: { jobId }, skip: !isWeb2(authMethod) });

  const [channel] = useChannel(jobId, (message) => {
    console.log(message);
  });

  if (!terminal) return;

  const writeToTerminal = ({ data, timestamp }: { data: Uint8Array; timestamp: bigint }) => {
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
  };

  if (isWeb3(authMethod)) {
    const grpcService = new GRPCService(loggerClient);
    let signatureObj = signRef.current;

    (async () => {
      if (!signatureObj) {
        const timestamp = Date.now();
        const signedHash = await sign({
          message: `read:${authMethod.address.toLowerCase()}/${jobId}/${timestamp}`,
        });
        signRef.current = {
          hash: signedHash,
          timestamp: timestamp,
        };
        signatureObj = {
          hash: signedHash,
          timestamp: timestamp,
        };
      }

      // Clear the logs
      const stream = await grpcService.readAndWatch(
        authMethod.address.toLowerCase(),
        jobId,
        signatureObj.hash,
        signatureObj.timestamp,
      );

      for await (const res of stream) {
        writeToTerminal(res);
      }
    })().catch(console.error);
  } else if (isWeb2(authMethod)) {
    if (started?.startStreamJobLogs) {
      channel.subscribe((message) => {
        writeToTerminal({ data: message.data, timestamp: BigInt(message.timestamp) });
      });
    }
  }

  return dlLink;
}
