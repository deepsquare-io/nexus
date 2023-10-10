// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import Ajv from 'ajv';
import * as draft6MetaSchema from 'ajv/dist/refs/json-schema-draft-06.json';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';
import type { IntrospectionQuery } from 'graphql/index';
import { configureMonacoYaml } from 'monaco-yaml';
import dynamic from 'next/dynamic';
import { parse } from 'yaml';
import introspection from '@graphql/external/sbatchServiceClient/generated/introspection.json';
import type Job from '@graphql/internal/types/objects/Job';

const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false });

const schema = fromIntrospectionQuery(introspection as unknown as IntrospectionQuery);
schema.properties = (schema.definitions!.Job as any).properties; // Switch graphql properties with job properties

type JsonEditorProps = {
  /**
   * Value is the pre-loaded value of the editor.
   */
  value?: string | null;
  /**
   * onChange returns the raw value in the value variable.
   *
   * The json schema is hardcoded in the editor.
   *
   * If the value is parsable by the YAML engine, it will returns a parsedValue
   * even if it is not passing validation.
   *
   * Errors is filled based on the schema validation. See the ajv engine.
   */
  onChange?: (value: string, parsedValue?: Job, errors?: any[]) => void;
};

function JsonEditor(props: JsonEditorProps) {
  // Validator engine
  const ajv = new Ajv({ strict: false });
  ajv.addMetaSchema(draft6MetaSchema);
  const validateJob = ajv.compile(schema);

  return (
    <MonacoEditor
      height="50vh"
      width="auto"
      language="yaml"
      options={{
        automaticLayout: true,
        suggest: {
          selectionMode: 'always',
          // Disable words suggestions.
          showWords: false,
        },
        scrollBeyondLastLine: false,
        trimAutoWhitespace: true,
        wordWrap: 'on',
        wrappingStrategy: 'advanced',
        renderWhitespace: 'trailing',
        quickSuggestions: {
          comments: 'off',
          other: 'inline',
          strings: 'inline',
        },
      }}
      value={props.value}
      onChange={(value) => {
        const errors: any[] = [];

        // Data parsing and validation.
        let job: Job | undefined;
        try {
          job = parse(value) as Job;
          validateJob(job);
          if (validateJob.errors) {
            errors.push(...validateJob.errors);
          }
        } catch (e) {
          errors.push(e);
        }

        if (props?.onChange) {
          props?.onChange(value, job, errors);
        }
      }}
      uri={(monaco) => {
        // Should match "fileMatch" below. This is the name of the file.
        return monaco.Uri.parse('job.yaml');
      }}
      editorWillMount={(monaco) => {
        configureMonacoYaml(monaco, {
          enableSchemaRequest: false,
          validate: true,
          hover: true,
          completion: true,
          format: true,
          schemas: [
            {
              // If YAML file is opened matching this glob
              fileMatch: ['job.yaml'],
              // The following schema will be applied
              schema: schema,
              // And the URI will be linked to as the source.
              uri: 'file:///schema.yaml',
            },
          ],
        });
      }}
    />
  );
}

export default JsonEditor;
