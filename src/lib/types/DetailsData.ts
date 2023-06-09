import type { EnvVar } from '@graphql/sbatchServiceClient/generated/Types';
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

  gpuPerTask?: number;

  cpuPerTask?: number;

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
