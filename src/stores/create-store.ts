import { makeAutoObservable } from 'mobx';

export default class CreateStore {
  model: string = '';
  year_prod: number | null = null;
  engine_type: string = '';
  drive_type: string = '';
  gearbox_type: string = '';
  hp: number | null = null;
  engine_capacity: number | null = null;
  color: string = '';
  mileage: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setModel(model: string) {
    this.model = model;
  }

  setYearProd(year: number) {
    this.year_prod = year;
  }

  setEngineType(type: string) {
    this.engine_type = type;
  }

  setDriveType(type: string) {
    this.drive_type = type;
  }

  setGearboxType(type: string) {
    this.gearbox_type = type;
  }

  setHp(hp: number) {
    this.hp = hp;
  }

  setEngineCapacity(cap: number) {
    this.engine_capacity = cap;
  }

  setColor(color: string) {
    this.color = color;
  }

  setMileage(mileage: number) {
    this.mileage = mileage;
  }

  reset() {
    this.model = '';
    this.year_prod = null;
    this.engine_type = '';
    this.drive_type = '';
    this.gearbox_type = '';
    this.hp = null;
    this.engine_capacity = null;
    this.color = '';
    this.mileage = null;
  }
}
