import { makeAutoObservable, reaction } from 'mobx';
import { ICarFilter } from './interfaces/car-filter.interface';
import { CarOptions } from './interfaces/car-filter.options';
import { FilterByOwnerStore } from './filter-by-owner.store';
import { FilterByModelStore } from './filter-by-model.store';
import { createKeysFromInterface, removeNullParams } from '@/utils/common.utils';
import { FilterRequests } from '@/requests/filter-requests';
import { ICar } from '@/interfaces/car.interface';
import { getSearchParams, setSearchParams } from '@/utils/browser-history.utils';

export type FilterParams<FilterInterface> = Record<keyof FilterInterface, string | null>;

export class CarFilterStore {
  filterByOwner = new FilterByOwnerStore();
  filterByModel = new FilterByModelStore();

  appliedFilters: FilterParams<ICarFilter> = {
    owner: null,
    mark: null,
    model: null,
    year_from: null,
    year_to: null,
  };
  limit: number | null = null;
  permanentParams: Partial<ICarFilter> = {};
  isShowSearchQuery: boolean = false;
  cars: ICar[] = [];
  totalCars: number = 0;

  constructor(parameters: ICarFilter, options: CarOptions) {
    makeAutoObservable(this);
    this.permanentParams = parameters;
    this.isShowSearchQuery = options.isShowSearchQuery;
    this.limit = options.limit;

    reaction(
      () => this.appliedFilters,
      () => {  
        this.fetchCars();
      }
    );

    reaction(
      () => this.filterByOwner.filter,
      () => this.apply()
    );

    reaction(
      () => this.filterByModel.filterMark,
      () => this.apply()
    );

    reaction(
      () => this.filterByModel.filterModel,
      () => this.apply()
    );

    this.applyInitialAndSearchParams();
  }

  async applyInitialAndSearchParams() {
    if (this.isShowSearchQuery) {
      this.applySearchParams();
    }
    await this.applyInitialSearchParams(this.permanentParams);

    this.setAppliedFilters({
      ...this.appliedFilters,
      owner: this.filterByOwner.filter,
      mark: this.filterByModel.filterMark,
      model: this.filterByModel.filterModel,
    });
  }

  applyInitialSearchParams = async (params: ICarFilter) => {
    const { owner, mark, model, year_from, year_to } = params;

    if (owner) {
      await this.filterByOwner.applyInitialOwner(owner);
    }
    if (mark) {
      await this.filterByModel.applyInitialMark(mark);
    }
    if (model) {
      await this.filterByModel.applyInititalModel(model);
    }
  };

  setAppliedFilters(filters: FilterParams<ICarFilter>): void {
    this.appliedFilters = filters;
  }

  protected applySearchParams(): void {
    const params = this.getSearchParams();

    if (params) {
      const keys = createKeysFromInterface(this.appliedFilters);
      const hasParams = Object.entries(params).every(([key, param]) => {
        return keys.includes(key as keyof ICarFilter) && Boolean(param);
      });

      if (hasParams) {
        this.applyInitialSearchParams(params);
      }
    }

    reaction(
      () => this.appliedFilters,
      () => {
        setSearchParams(this.appliedFilters as Record<string, string | null>);
      }
    );
  }

  private getSearchParams(): Record<keyof ICarFilter, string> | null {
    const searchParams = getSearchParams() ?? null;

    if (searchParams) {
      return Object.fromEntries(searchParams) as Record<keyof ICarFilter, string>;
    }

    return null;
  }

  apply(): void {
    this.setAppliedFilters({
      ...this.getFiltersForApply(),
      ...this.appliedFilters,
    });
  }

  getFiltersForApply = (): Record<keyof ICarFilter, string | null> => {
    return {
      owner: this.filterByOwner.filter,
      mark: this.filterByModel.filterMark,
      model: this.filterByModel.filterModel,
      year_from: null,
      year_to: null,
    };
  };

  setCars(cars: ICar[]) {
    this.cars = cars;
  }

  setTotalItems = (count: number) => {
    this.totalCars = count;
  };

  async fetchCars() {
    this.cars = [];
    const filters = this.getFilterParams();
    console.log(filters)
    const response = await new FilterRequests().fetchCars(filters);
    if (response.items) {
      this.setCars(response.items);
      this.setTotalItems(response.count);
    }
  }

  loadMore = async (): Promise<void> => {
    const filters = {
      ...this.getFilterParams(),
      offset: this.cars.length,
    };

    const response = await new FilterRequests().fetchCars(filters);

    if (response) {
      this.setCars([...this.cars, ...response.items]);
      this.setTotalItems(response.count);
    }
  };

  private getFilterParams(): Partial<ICarFilter> {
    const filterParams = {
      ...this.appliedFilters,
      limit: this.limit,
      owner: this.filterByOwner.filter,
      mark: this.filterByModel.filterMark,
      model: this.filterByModel.filterModel,
    };

    return removeNullParams(filterParams);
  }

  reset(){
    this.filterByModel.resetModel();
    this.filterByModel.resetMark();
  }
}
