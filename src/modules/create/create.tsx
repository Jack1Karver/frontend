import Block from '@/components/block/block';
import Select from '@/components/select/select';
import { CarRequests } from '@/requests/car.requests';
import React, { useEffect, useMemo, useState } from 'react';

import styles from './scss/create.module.scss';
import BlockHead from '@/components/block/block-head';
import CreateStore from '@/stores/create-store';
import { observer } from 'mobx-react';
import Input from '@/components/input/input';
import { IModel } from '@/interfaces/model.interface';
import { engineType } from '@/config/enums/engine-type';
import { driveType } from '@/config/enums/drive-type';
import { gearboxType } from '@/config/enums/gearbox-type';
import Button from '@/components/button/button';
import FileInputToken from '@/components/file-input/file-input-token';
import userStore from '@/stores/user-store';
import { FILE_EXTENSIONS } from '@/config/files.config';

const Create = observer(() => {
  const [marks, setMarks] = useState<string[]>([]);
  const [models, setModels] = useState<IModel[]>([]);
  const user = userStore

  const [createStore] = useState(() => new CreateStore());

  const fetchMarks = async () => {
    setMarks(
      (await CarRequests.getMarks()).map(mark => {
        return mark.name;
      })
    );
  };

  const getYears = () => {

    const array = Array((createStore.model?.year_to ?? new Date().getFullYear()) - createStore.model!.year_from)
      .fill(' ')
      .map((val, index) => {
        return createStore.model!.year_from + index;
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
              onSelect={val => {createStore.setModel(models.find(model=>model.name === val) ?? null)}}
              title={'Model'}
            />
          ) : (
            ''
          )}
          {createStore.model ? (
            <>
             <FileInputToken
              id={'file_input'}
              setFiles={(files)=> createStore.setFiles(files)}
              extensions={FILE_EXTENSIONS.image}
              />
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
              <Input type={'number'} title={'Horsepower'} onChange={e => createStore.setHp(e.target.value)} />
              <Input type={'number'} title={'Engine capacity'} onChange={e => createStore.setEngineCapacity(e.target.value)} />
              <Input type={'text'} title={'Color'} onChange={e => createStore.setColor(e.target.value)} />
              <Input type={'number'} title={'Mileage'} onChange={e => createStore.setMileage(e.target.value)} />
              <Input type={'textarea'} title={'Description'} onChange={e => createStore.setDescription(e.target.value)} />
              <Input type={'number'} title={'Price'} onChange={e => createStore.setPrice(e.target.value)} />
              <Button className={styles.create__button} content={'Create offer'} mod={'brand'} onClick={()=>createStore.createPrototype()} />
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
