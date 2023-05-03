import BlockHead from '@/components/block/block-head';
import ListColumns from '@/components/column-list/list';
import { IMark } from '@/models';
import { CarRequests } from '@/requests/car.requests';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PopularMarks = () => {
  const [marks, setMarks] = useState<IMark[]>([]);

  const fetchPopular = async () => {
    const res = await CarRequests.getPopularMarks();
    setMarks(res);
  };

  useEffect(()=>{
    fetchPopular()
  }, [])

  return (
    <div>
    <BlockHead title={'Choose mark'}/>
    <ListColumns
      items={
        marks?.map(mark => {
          return <Link href={'/car/ford/all'}>{mark.name}</Link>;
        return <span>{mark.name}</span>
        })
      }
    />
    </div>
  );
};

export default PopularMarks