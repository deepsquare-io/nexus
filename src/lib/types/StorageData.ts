// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
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
