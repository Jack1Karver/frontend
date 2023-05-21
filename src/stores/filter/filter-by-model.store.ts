import { IMark } from '@/interfaces/mark-interface';
import { IModel } from '@/interfaces/model.interface';

import { CarRequests } from '@/requests/car.requests';
import { makeAutoObservable } from 'mobx';

export class FilterByModelStore {
  mark: IMark | null = null;
  model: IModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setMark(mark: IMark) {
    this.mark = mark;
  }

  setModel(model: IModel) {
    this.model = model;
  }

  async applyInititalModel(name: string) {
    const model = await this.fetchInitialModel(name);
  }

  async applyInitialMark(name: string) {
    const mark = await this.fetchInitialMark(name);

    this.setMark(mark);
  }

  private async fetchInitialMark(name: string) {
    return await CarRequests.fetchMark(name);
  }

  private async fetchInitialModel(name: string) {
    if (this.mark) {
      return await CarRequests.fetchModel(name, this.mark.id);
    }
  }

  get filterMark(): string | null {
    return this.mark?.name ?? null;
  }

  get filterModel(): string | null {
    return this.model?.name ?? null;
  }
}
