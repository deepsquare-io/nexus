'use client';

// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { useSearchParams } from 'next/navigation';
import type { Terminal } from 'xterm';
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

const JobConsolePage = ({ params }: { params: { jobId: string } }) => {
  const [showTimestamp, setShowTimestamp] = useState<boolean>(false);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const searchParams = useSearchParams();
  const download = searchParams.get('download');

  const handleDownload = useCallback((url: string) => {
    window.location.href = url.replace(/(.*)transfer.deepsquare.run(.*)/, '$1transfer.deepsquare.run/get/$2');
  }, []);

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
      {dlLink && (
        <Zoom
          style={{
            transitionDelay: `50ms`,
          }}
          unmountOnExit
        >
          <div className="md:relative">
            <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10">
              <div className="flex justify-end mx-4 md:justify-center">
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={() => {
                    handleDownload(dlLink);
                  }}
                  aria-label="download"
                >
                  <FileDownload />
                  Download results
                </Fab>
              </div>
            </div>
          </div>
        </Zoom>
      )}
    </div>
  );
};

const MemoXTerm = memo(XTerm, (prev, next) => JSON.stringify(prev) == JSON.stringify(next));

export default JobConsolePage;
