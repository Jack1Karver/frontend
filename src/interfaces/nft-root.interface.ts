import { ICollectionRoot } from "./collection-root.interface";


interface IMarketRoot {
  address: string;
  rootAbi: string;
}

export interface ISellRoot extends IMarketRoot {
  sellAbi: string;
}

export interface IAuctionRoot extends IMarketRoot {
  auctionAbi: string;
}

export interface INftRoot {
  address: string;
  codeHash: string;
  rootAbi: string;
  dataAbi: string;
  sellRoot: ISellRoot;
  sellRootTip3: ISellRoot;
  auctionRoot: IAuctionRoot;
  auctionRootTip3: IAuctionRoot;
  collectionRoot?: ICollectionRoot;
}
