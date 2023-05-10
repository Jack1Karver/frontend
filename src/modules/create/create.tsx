import Block from '@/components/block/block';
import Select from '@/components/select/select';
import { CarRequests } from '@/requests/car.requests';
import React, { useEffect, useState } from 'react';

import styles from './scss/create.module.scss';
import BlockHead from '@/components/block/block-head';
import CreateStore from '@/stores/create-store';
import { observer } from 'mobx-react';
import Input from '@/components/input/input';
import { IModel } from '@/interfaces/model.interface';
import { engineType } from '@/config/enums/engine-type';
import { driveType } from '@/config/enums/drive-type';
import { gearboxType } from '@/config/enums/gearbox-type';

const Create = observer(() => {
  const [marks, setMarks] = useState<string[]>([]);
  const [models, setModels] = useState<IModel[]>([]);

  const [createStore] = useState(() => new CreateStore());

  const fetchMarks = async () => {
    setMarks(
      (await CarRequests.getMarks()).map(mark => {
        return mark.name;
      })
    );
  };

  const getYears = () => {
    const model = models.find(model => createStore.model === model.name);
    const array = Array((model?.year_to ?? new Date().getFullYear()) - model!.year_from)
      .fill(' ')
      .map((val, index) => {
        return model!.year_from + index;
      })
      .reverse();
    return array;
  };

  const fetchModels = async (mark: string) => {
    createStore.reset();
    setModels(await CarRequests.getModels(mark));
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  return (
    <Block bg={'light'} containerMod={'sm'} first={true}>
      <BlockHead title={'Create'} />
      <div className={styles.create}>
        <div className={styles.create__form}>
          <Select
            options={marks}
            placeholder={'Select mark'}
            onSelect={mark => {
              fetchModels(mark as string);
            }}
            title={'Mark'}
          />
          {models.length ? (
            <Select
              options={models.map(model => model.name)}
              placeholder={'Select model'}
              onSelect={model => createStore.setModel(model as string)}
              title={'Model'}
            />
          ) : (
            ''
          )}
          {createStore.model ? (
            <>
              <Select
                options={getYears()}
                placeholder={'Year'}
                title={'Production year'}
                onSelect={year => createStore.setYearProd(year as number)}
              />
              <Select
                options={Object.values(engineType)}
                placeholder={'Select engine type'}
                onSelect={type => createStore.setEngineType(type as string)}
                title={'Engine type'}
              />
              <Select
                options={Object.values(driveType)}
                placeholder={'Select drive type'}
                onSelect={type => createStore.setDriveType(type as string)}
                title={'Drive type'}
              />
              <Select
                options={Object.values(gearboxType)}
                placeholder={'Select gear box type'}
                onSelect={type => createStore.setGearboxType(type as string)}
                title={'Gear box type'}
              />
              <Input type={'number'} title={'Horsepower'} onChange={val => createStore.setHp(val)} />
              <Input type={'number'} title={'Engine capacity'} onChange={val => createStore.setEngineCapacity(val)} />
              <Input type={'text'} title={'Color'} onChange={val => createStore.setColor(val)} />
              <Input type={'number'} title={'Mileage'} onChange={val => createStore.setMileage(val)} />
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </Block>
  );
});

export default Create;
