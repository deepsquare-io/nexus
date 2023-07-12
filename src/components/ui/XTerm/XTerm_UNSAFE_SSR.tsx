// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.

/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { ImageAddon } from 'xterm-addon-image';
import { WebLinksAddon } from 'xterm-addon-web-links';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type XTermProps from './XTermProps';

const XTerm_UNSAFE_SSR: FC<XTermProps> = ({
  className,
  onTerminal,
  onBinary,
  onCursorMove,
  onData,
  onKey,
  onLineFeed,
  onRender,
  onResize,
  onScroll,
  onSelectionChange,
  onTitleChange,
  options,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>();

  function handleLink(event: MouseEvent, uri: string): void {
    if (uri.endsWith('.png')) {
      setUrl(uri);
      return;
    }

    const newWindow = window.open();
    if (newWindow) {
      try {
        newWindow.opener = null;
      } catch {
        // no-op, Electron can throw
      }
      newWindow.location.href = uri;
    } else {
      console.warn('Opening link blocked as opener could not be cleared');
    }
  }

  const fitAddon = useMemo(() => new FitAddon(), []);

  const terminalRef = useRef<Terminal | null>(null);

  // Initial terminal instanciation
  useEffect(() => {
    if (terminalRef.current)
      return () => {
        terminalRef.current?.dispose();
        terminalRef.current = null;
      };
    const newTerminal = new Terminal({
      rows: 40,
      ...options,
    });
    newTerminal.loadAddon(fitAddon);
    newTerminal.loadAddon(
      new WebLinksAddon(handleLink, {
        urlRegex: /https?:\/\/.*$/,
      }),
    );
    newTerminal.loadAddon(
      new ImageAddon({
        sixelScrolling: true,
        sixelSupport: true,
      }),
    );

    terminalRef.current = newTerminal;

    return () => {
      newTerminal?.dispose();
      terminalRef.current = null;
    };
  }, [terminalRef, options, fitAddon]);

  const terminalDisposeRef = useRef<(() => void) | undefined>();

  // Bootstrap XTerm
  useEffect(() => {
    if (!terminalRef.current || !containerRef.current) {
      window.addEventListener('resize', () => fitAddon.fit());
      return () => {
        const dispose = terminalDisposeRef.current;
        if (dispose) dispose();
        window.removeEventListener('resize', () => fitAddon.fit());
      };
    }
    terminalRef.current.open(containerRef.current);
    fitAddon.fit();

    if (onTerminal) {
      terminalDisposeRef.current = onTerminal(terminalRef.current);
    }

    // Register event handlers
    window.addEventListener('resize', () => fitAddon.fit());
    return () => {
      const dispose = terminalDisposeRef.current;
      if (dispose) dispose();
      window.removeEventListener('resize', () => fitAddon.fit());
    };
  }, [terminalDisposeRef, terminalRef, fitAddon, containerRef, onTerminal]);

  // /*
  //  * XTerm event listeners hooks
  //  * ==============================
  //  */
  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onBinary((data: string) => onBinary && onBinary(data));
    return () => listener.dispose();
  }, [terminalRef, onBinary]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onCursorMove(() => onCursorMove && onCursorMove());
    return () => listener.dispose();
  }, [terminalRef, onCursorMove]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onData((data: string) => onData && onData(data));
    return () => listener.dispose();
  }, [terminalRef, onData]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onKey(
      (event: { key: string; domEvent: KeyboardEvent }) => onKey && onKey(event),
    );
    return () => listener.dispose();
  }, [terminalRef, onKey]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onLineFeed(() => onLineFeed && onLineFeed());
    return () => listener.dispose();
  }, [terminalRef, onLineFeed]);

  useEffect(() => {
    if (!terminalRef.current) return;
    const listener = terminalRef.current.onScroll((newPosition: number) => onScroll && onScroll(newPosition));
    return () => listener.dispose();
  }, [terminalRef, onScroll]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onSelectionChange(() => onSelectionChange && onSelectionChange());
    return () => listener.dispose();
  }, [terminalRef, onSelectionChange]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onRender(
      (event: { start: number; end: number }) => onRender && onRender(event),
    );
    return () => listener.dispose();
  }, [terminalRef, onRender]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onResize(
      (event: { cols: number; rows: number }) => onResize && onResize(event),
    );
    return () => listener.dispose();
  }, [terminalRef, onResize]);

  useEffect(() => {
    if (!terminalRef.current) return;

    const listener = terminalRef.current.onTitleChange((newTitle: string) => onTitleChange && onTitleChange(newTitle));
    return () => listener.dispose();
  }, [terminalRef, onTitleChange]);

  return (
    <div className="grid grid-cols-1 content-center" style={{ height: '100%' }}>
      <div ref={containerRef} className={classNames('xterm-container', 'shrink', className)} />

      {url && (
        <div className="p-2 flex justify-center">
          <img alt="image from terminal" width={500} height={500} className="object-contain object-center" src={url} />
        </div>
      )}
    </div>
  );
};

XTerm_UNSAFE_SSR.propTypes = {
  className: PropTypes.string,
  onTerminal: PropTypes.func,
  onBinary: PropTypes.func,
  onCursorMove: PropTypes.func,
  onData: PropTypes.func,
  onKey: PropTypes.func,
  onLineFeed: PropTypes.func,
  onRender: PropTypes.func,
  onResize: PropTypes.func,
  onScroll: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onTitleChange: PropTypes.func,
  options: PropTypes.object,
};

export default XTerm_UNSAFE_SSR;
