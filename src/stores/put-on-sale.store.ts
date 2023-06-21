import { action, makeObservable, observable } from 'mobx';


export class PutOnSaleStore{
  price = 0;

  constructor() {    
    makeObservable(this, {
      price: observable,
      setPrice: action,
      reset: action,
    });
  }

  setPrice = (price: number) => {
    this.price = price;
  };

  reset() {
    this.price = 0;
  }
}
