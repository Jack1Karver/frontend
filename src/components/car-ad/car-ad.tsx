import { ICar } from '@/interfaces/car.interface';
import React, { useEffect, useState } from 'react';
import styles from './scss/car-ad.module.scss';
import Button from '../button/button';
import Link from 'next/link';
import Router from 'next/router';
import UserStore from '@/stores/user-store';
import ModalStore from '@/stores/modal-store'
import dynamic from 'next/dynamic';

type CarAdProps = {
  car: ICar;
};

const CarAd = ({ car }: CarAdProps) => {
  const DynamicPutOnSale = dynamic(() => import('@/components/modal/market/put-on-sale'), { ssr: false });
  const [activePhoto, setActivePhoto] = useState<string>(car.files[0]);  
  const userStore = UserStore;

  useEffect(() => {
    showFile(0);
  }, []);

  const putOnSale = (e: React.MouseEvent)=>{
    e.stopPropagation()
    ModalStore.setIsShowModal(true);
    ModalStore.setModalContent(<DynamicPutOnSale car={car}/>);
  }

  const showFile = (index: number) => {};
  return (
    <div className={styles.car_ad} onClick={() => Router.push(`/ad/${car.address}`)}>
      <div className={styles.car_ad__image}>
        <img src={`data:image/png;base64,${activePhoto}`} alt={''} />
      </div>
      <div className={styles.car_ad__info}>
        <h4>
          {car.carFeatures.model.mark.name} {car.carFeatures.model.name} {`(${car.carFeatures.yearProd})`}
        </h4>
        <div className={styles.car_ad__description}>
        <span>{car.carFeatures.mileage} Km</span>
          <span>
            {car.carFeatures.engineCapacity} l / {car.carFeatures.hp} HP / {car.carFeatures.engineType}{' '}
          </span>
          <span>{car.carFeatures.driveType}</span>
          <span>{car.carFeatures.gearboxType}</span>
          <span>{car.carFeatures.color}</span>

        </div>
      </div>
      <div className={styles.car_ad__info}>
        <h4>Owner</h4>
        <Link href={`/user/${car.owner.slug}`} onClick={e => e.stopPropagation()} className={styles.car_ad__owner}>
          {car.owner.name}
        </Link>
      </div>
      <div className={styles.car_ad__price}>
        {car.offer ? (
          <>
            <h3>{car.offer.price} EVER</h3>
            {userStore.user?.slug === car.owner.slug ? (
              <Button size={'md'} mod={'brand'} content={'Cancel sale'} />
            ) : (
              <Button size={'md'} mod={'brand'} content={'Buy'} />
            )}
          </>
        ) : (
          <>
            <h3>Not for sale</h3>
            {userStore.user?.slug === car.owner.slug ? (
              <Button size={'md'} mod={'brand'} content={'Put on sale'} onClick={e=>putOnSale(e)} />
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarAd;
