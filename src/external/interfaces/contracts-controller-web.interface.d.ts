import { IItem } from 'src/types/interfaces/items/item.interface';
import { ICollection, ICollectionPrototype } from 'src/modules/collection/interfaces/collection.interface';
import { ICollectionRoot } from 'src/types/interfaces/roots/collection-root.interface';
import { IGroupItemPrototype } from 'src/types/interfaces/group-item/group-item-prototype.interface';
import { IOffer } from 'src/types/interfaces/offer.interface';
import ItemStore from 'src/stores/item/item-store';
import { ITokenRoot } from '../interfaces/roots/token-root.interface';

export interface IContractsControllerWeb<ReturnType> {
  mintToken(
    {
      name,
      url,

    }: {
      name: string;
      url: string;

    }
   ): Promise<ReturnType>;

  sellToken(itemStore: ItemStore, price: number): Promise<ReturnType>;

  buyToken(itemStore: ItemStore): Promise<ReturnType>;

  cancelSell(offer: IOffer): Promise<ReturnType>;
}

export interface IWalletTransactionsService<ReturnType> {
  mintToken(
    name: string,
    url: string,
   ): Promise<ReturnType>;


  sellToken(itemStore: ItemStore, price: number): Promise<ReturnType>;

  buyToken(itemStore: ItemStore): Promise<ReturnType>;

  cancelSell(offer: IOffer): Promise<ReturnType>;
}
