import React from 'react';
import { ICar } from '@/interfaces/car.interface';
import styles from './scss/car-block.module.scss';
import Block from '../block/block';
import BlockHead from '../block/block-head';
import { IUser } from '@/interfaces/user.interface';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CarFilterStore } from '@/stores/filter/car-ad.store';
import CarAd from '../car-ad/car-ad';

type CarBlockProps = {
  carStore: CarFilterStore
};

const CarBlock = observer(({carStore }: CarBlockProps) => {
  
  return (
    <Block bg={'light'}>
      <BlockHead title={'My offers'} />
      <InfiniteScroll
        next={carStore.loadMore}
        hasMore={carStore.totalCars > carStore.cars.length}
        dataLength={carStore.cars.length}
        loader={<></>}
      >
        <div className={styles.car_block}>
        {carStore.cars.map(car=>{
          return <CarAd car={car}/>
        })}
        </div>
      </InfiniteScroll>
    </Block>
  );
});

export default CarBlock;
