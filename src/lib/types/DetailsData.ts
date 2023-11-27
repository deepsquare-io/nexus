// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { EnvVar } from '@graphql/external/sbatchServiceClient/generated/Types';
import type StorageData from '@lib/types/StorageData';
import type BlenderOutputFormat from '@lib/types/enums/BlenderOutputFormat';
import type BlenderRenderEngine from '@lib/types/enums/BlenderRenderEngine';
import type TextToImageModel from '@lib/types/enums/TextToImageModel';

export default class DetailsData {
  archiveLink?: string;

  binaryPath?: string;

  additionalArgs?: string;

  version?: string;

  outputFormat?: BlenderOutputFormat;

  renderEngine?: BlenderRenderEngine;

  inputData?: StorageData;

  outputData?: StorageData;

  containerUrl?: string;

  containerImage?: string;

  containerUser?: string;

  containerPassword?: string;

  envVars?: EnvVar[];

  command?: string;

  gpusPerTask?: number;

  cpusPerTask?: number;

  memPerCpu?: number;

  nTasks?: number;

  disableCpuBinding?: boolean;

  x11?: boolean;

  useApptainerRuntime?: boolean;

  useDeepsquareHostedImage?: boolean;

  isAnime?: boolean;

  isVideo?: boolean;

  tti?: string;

  ttiModel?: TextToImageModel;

  steps?: string;

  height?: string;

  width?: string;
}
