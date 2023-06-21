
import { ISellRoot } from "./nft-root.interface";


export interface IOffer {
  id: string;
  contractAddress: string;
  price: number;
  dateCreated: Date;
  dateClosed?: Date;
  status: string;
  sellRoot: ISellRoot;
  sellProxy: {
    abi: string;
    address: string;
  };
}
