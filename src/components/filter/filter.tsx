import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Block from '../block/block';
import Select from '../select/select';
import { CarFilterStore } from '@/stores/filter/car-ad.store';
import { CarRequests } from '@/requests/car.requests';
import styles from './scss/filter.module.scss';
import Router from 'next/router';
import { IMark } from '@/interfaces/mark-interface';
import { reaction } from 'mobx';

type FilterProps = {
  carFilterStore: CarFilterStore;
};

const AdsFilter = observer(({ carFilterStore }: FilterProps) => {
  const [marks, setMarks] = useState<IMark[]>([]);
  const [models, setModels] = useState<string[]>([]);

  const fetchMarks = async () => {
    setMarks(await CarRequests.getMarks());
  };

  useEffect(() => {
    fetchMarks();
    if (carFilterStore.filterByModel.mark) {
      fetchModels(carFilterStore.filterByModel.mark.name);
    }
  }, []);

  reaction(
    () => carFilterStore.filterByModel.mark,
    () => fetchModels(carFilterStore.filterByModel.mark!.name)
  );

  const fetchModels = async (mark: string) => {
    setModels((await CarRequests.getModels(mark)).map(model => model.name));
  };

  const selectMark = (markName: string) => {
    carFilterStore.filterByModel.setMark(marks.find(mark => mark.name === markName)!);
    Router.push(`/ads/${markName}`);
  };

  const selectModel = async (model: string) => {
    carFilterStore.filterByModel.applyInititalModel(model);
  };

  const clearMark = () => {
    carFilterStore.reset();
    Router.push('/ads');
  };

  return (
    <Block bg={'dark'} first={true}>
      <div className={styles.filter}>
        <Select
          options={marks.map(mark => mark.name)}
          bg={'dark'}
          placeholder={'Select mark'}
          onSelect={val => {
            selectMark(val as string);
          }}
          onClear={clearMark}
          selected={carFilterStore.filterByModel.mark?.name}
        />
        <Select
          bg={'dark'}
          options={models}
          placeholder={'Select model'}
          onSelect={val => {
            selectModel(val as string);
          }}
          selected={carFilterStore.filterByModel.model?.name}
        />
      </div>
    </Block>
  );
});

export default AdsFilter;
