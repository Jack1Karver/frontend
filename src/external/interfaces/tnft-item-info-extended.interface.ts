import { ITnftItemInfo } from './tnft-item-info.interface';

export interface ITnftItemInfoExtended extends ITnftItemInfo {
  royalty: number;
}
