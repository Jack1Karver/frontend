import CarBlock from '@/components/car-block/car-block';
import Layout from '@/components/layout/layout';
import { FILTER_LIMIT } from '@/config/options.config';
import { IMark } from '@/interfaces/mark-interface';
import { CarFilterStore } from '@/stores/filter/car-ad.store';
import { observer } from 'mobx-react';
import { GetServerSideProps } from 'next';
import React, { useMemo } from 'react';
import AdsFilter from '@/components/filter/filter';

type AdsProps = {
  mark?: string;
  model?: string;
};

const Ads = observer(({ mark, model }: AdsProps) => {
  const filterStore = useMemo(
    () =>
      new CarFilterStore(
        {
          mark: mark,
          model: model,
        },
        {
          limit: FILTER_LIMIT,
          isShowSearchQuery: false,
        }
      ),
    []
  );

  return (
    <Layout>
      <>
        <AdsFilter carFilterStore={filterStore} />
        <CarBlock carStore={filterStore} head={'Offers'} />
      </>
    </Layout>
  );
});

export default Ads;

export const getServerSideProps: GetServerSideProps = async context => {
  const car = context.query;

  if (car.car) {
    const mark = car.car[0];
    const model = car.car[1] ?? null;
    return {
      props: {
        mark,
        model,
      },
    };
  } else
    return {
      props: {},
    };
};
