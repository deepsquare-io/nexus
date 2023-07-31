import type { Hex } from 'viem';

export default interface User {
  _id: string;
  jobs: Hex[];
}
