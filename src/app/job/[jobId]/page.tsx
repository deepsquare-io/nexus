'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSignMessage } from 'wagmi';
import type { Terminal } from 'xterm';
import type { MouseEvent } from 'react';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import XTerm from '@components/ui/XTerm/XTerm';
import loggerClient from '@grpc/client';
import { GRPCService } from '@grpc/service';
import { authContext } from '@lib/contexts/AuthContext';
import { isWeb3 } from '@lib/types/AuthMethod';
import { FileDownload } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Zoom from '@mui/material/Zoom';

type DownloadFABProps = {
  download: boolean;
  dlLink: string | undefined;
  onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, url: string) => void | undefined;
};

const DownloadFAB = ({ download, onClick, dlLink }: DownloadFABProps) => {
  if (download || !dlLink) return null;

  return (
    <div className="md:relative">
      <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10">
        <div className="flex justify-end mx-4 md:justify-center">
          <Fab
            variant="extended"
            color="primary"
            onClick={(e) => {
              onClick && onClick(e, dlLink);
            }}
            aria-label="download"
          >
            <FileDownload />
            Download results
          </Fab>
        </div>
      </div>
    </div>
  );
};

const JobConsolePage = ({ params }: { params: { jobId: string } }) => {
  const [dlLink, setDlLink] = useState<string>();
  const [showTimestamp, setShowTimestamp] = useState<boolean>(false);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const signRef = useRef<{ hash: `0x${string}`; timestamp: number }>();
  const router = useRouter();
  const { authMethod } = useContext(authContext);
  const { signMessageAsync: sign } = useSignMessage();
  const searchParams = useSearchParams();
  const download = searchParams.get('download');

  const handleDownload = (url: string) => {
    window.location.href = url.replace(/(.*)transfer.deepsquare.run(.*)/, '$1transfer.deepsquare.run/get/$2');
  };

  useEffect(() => {
    if (!terminal || !isWeb3(authMethod)) return;
    const grpcService = new GRPCService(loggerClient);
    let signatureObj = signRef.current;

    (async () => {
      if (!signatureObj) {
        const timestamp = Date.now();
        const signedHash = await sign({
          message: `read:${authMethod.address.toLowerCase()}/${params.jobId}/${timestamp}`,
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
        params.jobId,
        signatureObj.hash,
        signatureObj.timestamp,
      );
      const decoder = new TextDecoder();
      for await (const res of stream) {
        const lineStr = decoder.decode(res.data);
        if (/(.*)transfer.deepsquare.run(.*)/.test(lineStr)) {
          setDlLink(lineStr);
          if (download) {
            router.back();
            handleDownload(lineStr);
          }
        }
        if (showTimestamp) {
          terminal.write(new Date(Number(res.timestamp / 1000000n)).toISOString() + ' ');
        }
        terminal.writeln(res.data);
      }
    })().catch(console.error);

    return () => {
      grpcService.stopReadAndWatch();
      terminal.clear();
    };
  }, [authMethod, download, params, router, showTimestamp, sign, terminal]);

  const onTerminal = useCallback(
    (terminal: Terminal) => {
      if (!terminal) return;
      setTerminal(terminal);

      return () => ({});
    },
    [setTerminal],
  );

  return (
    <div className="grid grid-cols-1 justify-items-center justify-items-stretch">
      <div className="mb-20" style={{ visibility: !download ? 'visible' : 'hidden' }}>
        <Card raised elevation={3}>
          <CardActions className="gap-3 flex-wrap">
            <span>
              Use <kbd>Ctrl</kbd> + <kbd>Insert</kbd> to copy.
            </span>
            <FormGroup>
              <FormControlLabel
                control={<Switch />}
                label="Show timestamps"
                checked={showTimestamp}
                onChange={() => setShowTimestamp(!showTimestamp)}
              />
            </FormGroup>
          </CardActions>
          <MemoXTerm
            onTerminal={onTerminal}
            options={{
              scrollback: 9999999,
              allowProposedApi: true,
            }}
          />
        </Card>
      </div>
      <Zoom
        in={dlLink !== undefined}
        style={{
          transitionDelay: `50ms`,
        }}
        unmountOnExit
      >
        <div>
          <DownloadFAB onClick={(e, url) => handleDownload(url)} download={!!download} dlLink={dlLink} />
        </div>
      </Zoom>
    </div>
  );
};

const MemoXTerm = memo(XTerm, (prev, next) => JSON.stringify(prev) == JSON.stringify(next));

export default JobConsolePage;
