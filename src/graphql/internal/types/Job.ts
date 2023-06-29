import { Field, InputType, Int, ObjectType } from 'type-graphql';
import type {
  Bore as BoreGQL,
  ContainerRun as ContainerRunGQL,
  EnvVar as EnvVarGQL,
  ForRange as ForRangeGQL,
  HttpData as HttpDataGQL,
  Job as JobGQL,
  JobResources as JobResourcesGQL,
  Mount as MountGQL,
  NetworkInterface as NetworkInterfaceGQL,
  S3Data as S3DataGQL,
  Step as StepGQL,
  StepAsyncLaunch as StepAsyncLaunchGQL,
  StepFor as StepForGQL,
  StepRun as StepRunGQL,
  StepRunResources as StepRunResourcesGQL,
  StepUse as StepUseGQL,
  TransportData as TransportDataGQL,
  Wireguard as WireguardGQL,
  WireguardPeer as WireguardPeerGQL,
} from '@graphql/external/sbatchServiceClient/generated/Types';

@InputType('EnvVarInput')
@ObjectType()
export class EnvVar implements EnvVarGQL {
  @Field(() => String)
  key!: string;

  @Field(() => String)
  value!: string;
}

@InputType('HttpDataInput')
@ObjectType()
export class HttpData implements HttpDataGQL {
  @Field(() => String)
  url!: string;
}

@InputType('S3DataInput')
@ObjectType()
export class S3Data implements S3DataGQL {
  @Field(() => String)
  accessKeyId!: string;

  @Field(() => String)
  bucketUrl!: string;

  @Field(() => Boolean, { nullable: true })
  deleteSync!: boolean | null;

  @Field(() => String)
  endpointUrl!: string;

  @Field(() => String)
  path!: string;

  @Field(() => String)
  region!: string;

  @Field(() => String)
  secretAccessKey!: string;
}

@InputType('TransportDataInput')
@ObjectType()
export class TransportData implements TransportDataGQL {
  @Field(() => HttpData, { nullable: true })
  http!: HttpData;

  @Field(() => S3Data, { nullable: true })
  s3!: S3Data;
}

@InputType('JobResourcesInput')
@ObjectType()
export class JobResources implements JobResourcesGQL {
  @Field(() => Int)
  cpusPerTask!: number;

  @Field(() => Int)
  gpusPerTask!: number;

  @Field(() => Int)
  memPerCpu!: number;

  @Field(() => Int)
  tasks!: number;
}

@InputType('ForRangeInput')
@ObjectType()
export class ForRange implements ForRangeGQL {
  @Field(() => Int)
  begin!: number;

  @Field(() => Int)
  end!: number;

  @Field(() => Int, { nullable: true })
  increment!: number | null;
}

@InputType('StepForInput')
@ObjectType()
export class StepFor implements StepForGQL {
  @Field(() => [String], { nullable: true })
  items!: string[] | null;

  @Field(() => Boolean)
  parallel!: boolean;

  @Field(() => ForRange, { nullable: true })
  range!: ForRange | null;

  @Field(() => [Step])
  steps!: Step[];
}

@InputType('StepAsyncLaunchInput')
@ObjectType()
export class StepAsyncLaunch implements StepAsyncLaunchGQL {
  @Field(() => String, { nullable: true })
  handleName!: string | null;

  @Field(() => Int, { nullable: true })
  signalOnParentStepExit!: number | null;

  @Field(() => [Step])
  steps!: Step[];
}

@InputType('StepRunResourcesInput')
@ObjectType()
export class StepRunResources implements StepRunResourcesGQL {
  @Field(() => Int, { nullable: true })
  cpusPerTask!: number | null;

  @Field(() => Int, { nullable: true })
  gpusPerTask!: number | null;

  @Field(() => Int, { nullable: true })
  memPerCpu!: number | null;

  @Field(() => Int, { nullable: true })
  tasks!: number | null;
}

@InputType('MountInput')
@ObjectType()
export class Mount implements MountGQL {
  @Field(() => String)
  containerDir!: string;

  @Field(() => String)
  hostDir!: string;

  @Field(() => String)
  options!: string;
}

@InputType('ContainerRunInput')
@ObjectType()
export class ContainerRun implements ContainerRunGQL {
  @Field(() => Boolean, { nullable: true })
  apptainer!: boolean | null;

  @Field(() => Boolean, { nullable: true })
  deepsquareHosted!: boolean | null;

  @Field(() => String)
  image!: string;

  @Field(() => [Mount], { nullable: true })
  mounts!: Mount[] | null;

  @Field(() => String, { nullable: true })
  password!: string | null;

  @Field(() => String, { nullable: true })
  registry!: string | null;

  @Field(() => String, { nullable: true })
  username!: string | null;

  @Field(() => Boolean, { nullable: true })
  x11!: boolean | null;
}

@InputType('BoreInput')
@ObjectType()
export class Bore implements BoreGQL {
  @Field(() => String)
  address!: string;

  @Field(() => Int)
  port!: number;

  @Field(() => Int)
  targetPort!: number;
}

@InputType('WireguardPeerInput')
@ObjectType()
export class WireguardPeer implements WireguardPeerGQL {
  @Field(() => [String], { nullable: true })
  allowedIPs!: string[] | null;

  @Field(() => String, { nullable: true })
  endpoint!: string | null;

  @Field(() => Int, { nullable: true })
  persistentKeepalive!: number | null;

  @Field(() => String, { nullable: true })
  preSharedKey!: string | null;

  @Field(() => String)
  publicKey!: string;
}

@InputType('WireguardInput')
@ObjectType()
export class Wireguard implements WireguardGQL {
  @Field(() => [String], { nullable: true })
  address!: string[] | null;

  @Field(() => [WireguardPeer], { nullable: true })
  peers!: WireguardPeer[] | null;

  @Field(() => String)
  privateKey!: string;
}

@InputType('NetworkInterfaceInput')
@ObjectType()
export class NetworkInterface implements NetworkInterfaceGQL {
  @Field(() => Bore, { nullable: true })
  bore!: Bore | null;

  @Field(() => Wireguard, { nullable: true })
  wireguard!: Wireguard | null;
}

@InputType('StepRunInput')
@ObjectType()
export class StepRun implements StepRunGQL {
  @Field(() => String)
  command!: string;

  @Field(() => ContainerRun, { nullable: true })
  container!: ContainerRun | null;

  @Field(() => [NetworkInterface], { nullable: true })
  customNetworkInterfaces!: NetworkInterface[] | null;

  @Field(() => Boolean, { nullable: true })
  disableCpuBinding!: boolean | null;

  @Field(() => [String], { nullable: true })
  dns!: string[] | null;

  @Field(() => [EnvVar], { nullable: true })
  env!: EnvVar[] | null;

  @Field(() => Boolean, { nullable: true })
  mapRoot!: boolean | null;

  @Field(() => String, { nullable: true })
  mpi!: string | null;

  @Field(() => String, { nullable: true })
  network!: string | null;

  @Field(() => StepRunResources, { nullable: true })
  resources!: StepRunResources | null;

  @Field(() => String, { nullable: true })
  shell!: string | null;

  @Field(() => String, { nullable: true })
  workDir!: string | null;
}

@InputType('StepUseInput')
@ObjectType()
export class StepUse implements StepUseGQL {
  @Field(() => [EnvVar], { nullable: true })
  args!: EnvVar[] | null;

  @Field(() => String, { nullable: true })
  exportEnvAs!: string | null;

  @Field(() => String)
  source!: string;
}

@InputType('StepInput')
@ObjectType()
export class Step implements StepGQL {
  @Field(() => [String], { nullable: true })
  dependsOn!: string[] | null;

  @Field(() => StepFor, { nullable: true })
  for!: StepFor | null;

  @Field(() => StepAsyncLaunch, { nullable: true })
  launch!: StepAsyncLaunch | null;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => StepRun, { nullable: true })
  run!: StepRun | null;

  @Field(() => StepUse, { nullable: true })
  use!: StepUse | null;
}

@InputType('JobInput')
@ObjectType()
export default class Job implements JobGQL {
  @Field(() => Boolean, { nullable: true })
  continuousOutputSync!: boolean | null;

  @Field(() => Boolean, { nullable: true })
  enableLogging!: boolean | null;

  @Field(() => [EnvVar], { nullable: true })
  env!: EnvVarGQL[];

  @Field(() => TransportData, { nullable: true })
  input!: TransportData;

  @Field(() => Int, { nullable: true })
  inputMode!: number;

  @Field(() => TransportData, { nullable: true })
  output!: TransportData;

  @Field(() => JobResources)
  resources!: JobResources;

  @Field(() => [Step])
  steps!: Step[];
}
