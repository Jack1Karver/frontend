import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { ICar } from '@/interfaces/car.interface';
import { IUser } from '@/interfaces/user.interface';

class CarStore {
  car: ICar;

  constructor(car: ICar, isPreview = false) {
    this.car = car;

    makeObservable(this, {
      car: observable,
      setOwner: action,
      setCar: action,
      currentPrice: computed,
    });
  }

  setCar = (car: ICar) => {
    this.car = car;
  };

  setOwner = (user: IUser): void => {
    this.car.owner = user;
  };

  get currentPrice(): number | undefined {
    return this.car.offer.price;
  }
}

export default CarStore;
