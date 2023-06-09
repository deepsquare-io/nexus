import * as y from 'yup';
import StorageType from '@lib/types/enums/StorageType';

export const StorageSchema = y
  .object()
  .optional()
  .shape({
    type: y.mixed<StorageType>().oneOf(Object.values(StorageType)).required(),
    url: y
      .string()
      .notRequired()
      .when('type', {
        is: (type: StorageType) => type === StorageType.S3 || type === StorageType.HTTP,
        then: (schema) => schema.required(),
      }),
    region: y
      .string()
      .notRequired()
      .when('type', {
        is: (type: StorageType) => type === StorageType.S3,
        then: (schema) => schema.required(),
      }),
    bucketName: y
      .string()
      .notRequired()
      .when('type', {
        is: (type: StorageType) => type === StorageType.S3,
        then: (schema) => schema.required(),
      }),
    accessToken: y
      .string()
      .notRequired()
      .when('type', {
        is: (type: StorageType) => type === StorageType.S3,
        then: (schema) => schema.required(),
      }),
    secretToken: y
      .string()
      .notRequired()
      .when('type', {
        is: (type: StorageType) => type === StorageType.S3,
        then: (schema) => schema.required(),
      }),
    path: y
      .string()
      .notRequired()
      .when('type', {
        is: (type: StorageType) => type === StorageType.S3,
        then: (schema) => schema.required(),
      }),
    deleteSync: y.boolean().notRequired(),
    dragAndDropFile: y
      .mixed<File>()
      .notRequired()
      .when('type', {
        is: (type: StorageType) => type === StorageType.DRAG_DROP,
        then: (schema) => schema.required(),
      }),
  });

export default class StorageData {
  type!: StorageType;

  url!: string;

  region?: string;

  bucketName?: string;

  accessToken?: string;

  secretToken?: string;

  path?: string;

  deleteSync?: boolean;

  dragAndDropFile?: File;
}
