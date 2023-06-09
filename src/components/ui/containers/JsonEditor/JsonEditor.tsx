import * as draft6MetaSchema from 'ajv/dist/refs/json-schema-draft-06.json';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';
import type { IntrospectionQuery } from 'graphql/index';
import type { JSONEditor, JSONSchema, JSONSchemaDefinitions } from 'vanilla-jsoneditor';
import { useCallback, useEffect, useRef } from 'react';
import introspection from '@graphql/sbatchServiceClient/generated/introspection.json';

function JsonEditor(props: Record<string, any>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<JSONEditor | null>(null);

  const updateProps = useCallback(
    async (editor: JSONEditor) => {
      const schema = fromIntrospectionQuery(introspection as unknown as IntrospectionQuery);
      const definitions: JSONSchemaDefinitions = {};

      if (schema.definitions) {
        Object.keys(schema.definitions).forEach((key) => {
          if (!schema.definitions) return;
          definitions[`#/definitions/${key}`] = schema.definitions[key] as JSONSchema;
        });
      }

      const createValidator = await import('vanilla-jsoneditor').then((module) => module.createAjvValidator);

      const validator = createValidator({
        schema: schema.definitions?.Job as JSONSchema,
        schemaDefinitions: definitions,
        onCreateAjv: (ajv) => {
          ajv.addMetaSchema(draft6MetaSchema);
        },
      });
      if (editor.updateProps) await editor.updateProps({ ...props, validator });
      return editor;
    },
    [props],
  );

  // Initial JSON editor instanciation and attach
  useEffect(() => {
    if (!containerRef.current) return;

    const jsonEditorPromise = import('vanilla-jsoneditor').then((module) => {
      const editor = new module.JSONEditor({
        target: containerRef.current as Element,
        props: {},
      });
      editorRef.current = editor;
      return updateProps(editor);
    });

    return () => {
      void jsonEditorPromise.then((editor) => {
        void editor.destroy();
        editorRef.current = null;
      });
    };
  }, [updateProps, containerRef, editorRef]);

  useEffect(() => {
    if (editorRef.current?.updateProps) void updateProps(editorRef.current);
  }, [updateProps]);

  return <div ref={containerRef} className="my-json-editor"></div>;
}

export default JsonEditor;
