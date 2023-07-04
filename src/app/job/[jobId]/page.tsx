'use client';

import { useSearchParams } from 'next/navigation';
import type { Terminal } from 'xterm';
import type { MouseEvent } from 'react';
import { memo, useCallback, useState } from 'react';
import XTerm from '@components/ui/XTerm/XTerm';
import useStreamLogs from '@hooks/useStreamLogs';
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
  const [showTimestamp, setShowTimestamp] = useState<boolean>(false);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const searchParams = useSearchParams();
  const download = searchParams.get('download');

  const handleDownload = (url: string) => {
    // window.location.href = url.replace(/(.*)transfer.deepsquare.run(.*)/, '$1transfer.deepsquare.run/get/$2');
  };

  // const dlLink = 'tet'

  const dlLink = useStreamLogs(terminal, params.jobId, showTimestamp, !!download, handleDownload);

  const onTerminal = useCallback(
    (terminal: Terminal) => {
      if (!terminal) return;
      setTerminal(terminal);

      return () => ({});
    },
    [setTerminal],
  );

  return (
    <div className="grid grid-cols-1 justify-items-center">
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
