import Layout from '@/components/layout/layout';
import { ICar } from '@/interfaces/car.interface';
import AdPage from '@/modules/ad/ad';
import { CarRequests } from '@/requests/car.requests';
import CarStore from '@/stores/car.store';
import { GetServerSideProps } from 'next';
import { useMemo } from 'react';

type AdProps = {
  car: ICar;
};

const Ad = ({ car }: AdProps) => {
  const carStore = useMemo(() => new CarStore(car), []);

  return (
    <Layout>
      <AdPage carStore={carStore} />
    </Layout>
  );
};

export default Ad;

export const getServerSideProps: GetServerSideProps = async context => {
  const { address } = context.query;

  let car;

  if (typeof address === 'string') {
    car = await CarRequests.fetchCarByAddress(address);
  }
  if (!car) {
    return { notFound: true };
  }

  return {
    props: {
      car,
    },
  };
};
