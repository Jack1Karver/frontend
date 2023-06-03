import BlockHead from '@/components/block/block-head';
import ListColumns from '@/components/column-list/list';
import { IMark } from '@/interfaces/mark-interface';
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
        marks ? 
        marks.map((mark, index) => {
          return <Link href={`/ads/${mark.name}`} key={index}>{mark.name}</Link>;
        })
        : []
      }
    />
    </div>
  );
};

export default PopularMarks