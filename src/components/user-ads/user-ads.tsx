import { FILTER_LIMIT } from '@/config/options.config';
import { IUser } from '@/interfaces/user.interface';
import { CarFilterStore } from '@/stores/filter/car-ad.store';
import { useMemo, useState } from 'react';
import CarBlock from '../car-block/car-block';

type UserAdProps = {
  user: IUser;
};

const UserAds = ({ user }: UserAdProps) => {
  const carFilterStore = useMemo(()=> new CarFilterStore(
        {
          owner: user.slug,
        },
        {
          limit: FILTER_LIMIT,
          isShowSearchQuery: true,
        }
      )
  , []);

  return (
    <>
    <CarBlock carStore={carFilterStore}/>
    </>
  )
};

export default UserAds
