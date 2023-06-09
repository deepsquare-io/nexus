import { arrayify } from '@ethersproject/bytes';
import type { ReadResponse } from '@grpc/generated/logger/v1alpha1/log';
import type { LoggerAPIClient } from '@grpc/generated/logger/v1alpha1/log.client';

export class GRPCService {
  private abortReadAndWatch: AbortController | null = null;

  constructor(private loggerClient: LoggerAPIClient) {}

  readAndWatch(
    address: string,
    logName: string,
    signedHash: string,
    timestamp: number,
  ): Promise<AsyncIterable<ReadResponse>> {
    this.abortReadAndWatch = new AbortController();

    //
    // const signedHash: string = await this.provider.send('personal_sign', [msg, address.toLowerCase()]);

    const { responses } = this.loggerClient.read(
      {
        address: address,
        logName: logName,
        timestamp: BigInt(timestamp),
        signedHash: arrayify(signedHash),
      },
      {
        abort: this.abortReadAndWatch.signal,
        timeout: 3_600_000, // 1h
      },
    );
    return Promise.resolve(responses);
  }

  stopReadAndWatch() {
    if (this.abortReadAndWatch !== null) {
      this.abortReadAndWatch.abort();
      this.abortReadAndWatch = null;
    }
  }
}
