// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import JsonEditor from '@components/ui/containers/JsonEditor/JsonEditor';
import type Job from '@graphql/internal/types/objects/Job';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

type Store = { content: string; initialized: boolean };

export interface WorkflowEditorProps {
  cacheKey: string;
  defaultContent: string;
  onContentChange: (value: string, parsedValue?: Job, contentErrors?: unknown[]) => void;
}

const WorkflowEditor: FC<WorkflowEditorProps> = ({ cacheKey, defaultContent, onContentChange }) => {
  const [store, setStore] = useState<Store>(() => {
    if (typeof window === 'undefined') return { content: '', initialized: false };
    const storedContent = localStorage.getItem(cacheKey);
    return storedContent
      ? (JSON.parse(storedContent) as Store)
      : {
          content: defaultContent,
          initialized: false,
        };
  });

  useEffect(() => {
    if (!store.initialized) return;
    localStorage.setItem(cacheKey, JSON.stringify(store));
  }, [cacheKey, store]);

  return (
    <div className="flex flex-col grow">
      <h2 className="font-medium">Write your workflow file</h2>
      <div>
        <p>
          <i>
            Use <kbd>ctrl</kbd> + <kbd>space</kbd> to open suggestions.
          </i>
        </p>
        <Card className="mt-5" variant="outlined">
          <JsonEditor
            value={store.content}
            onChange={(value: string, parsedValue?: Job, errors?: unknown[]) => {
              onContentChange(value, parsedValue, errors);
              setStore((prev) => {
                return { content: value, initialized: prev.initialized };
              });
            }}
          />
        </Card>
        <Button
          className="mt-5"
          onClick={() => {
            setStore({
              content: defaultContent,
              initialized: true,
            });
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default WorkflowEditor;
