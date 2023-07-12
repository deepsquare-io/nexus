// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
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
