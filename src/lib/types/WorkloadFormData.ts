import type DetailsData from '@lib/types/DetailsData';
import type WorkloadType from '@lib/types/enums/WorkloadType';

export interface WorkloadFormData {
  type: WorkloadType;
  details: DetailsData;
}
