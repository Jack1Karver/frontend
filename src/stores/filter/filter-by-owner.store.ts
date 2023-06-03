import { IUser } from '@/interfaces/user.interface';
import { fetchUserBySlug } from '@/requests/user-requests';
import { makeAutoObservable } from 'mobx';

export class FilterByOwnerStore {
  owner: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setOwner(owner: IUser) {
    this.owner = owner;
  }

  async applyInitialOwner(slug: string) {
    const owner = await this.fetchInitialOwner(slug);

    this.setOwner(owner);
  }

  private async fetchInitialOwner(slug: string) {
    return await fetchUserBySlug(slug);
  }

  get filter(): string | null {
    return this.owner?.slug ?? null;
  }
}
