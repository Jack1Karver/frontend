import { ICar } from '@/interfaces/car.interface';
import React from 'react';
import styles from './scss/card.module.scss';
import Link from 'next/link';
import { formatNumberWithLetter } from '@/utils/common.utils';

type CardProps = {
  car: ICar;
};

const Card = ({ car }: CardProps) => {
  return (
    <Link className={styles.card} href={`/ad/${car.address}`}>
      <div className={styles.card__wrapper}>
        <img src={`data:image/png;base64,${car.files[0]}`} alt={''} />
        <div className={styles.card__text}>
          <h4 className="">{`${car.carFeatures.model.mark.name} ${car.carFeatures.model.name} (${car.carFeatures.yearProd})`}</h4>
          <span>{car.carFeatures.mileage} km</span>
          <span>
            {car.carFeatures.engineType}/{car.carFeatures.hp}HP/
            {car.carFeatures.engineCapacity ? `${car.carFeatures.engineCapacity}L` : ''}
          </span>
          <span className={styles.card__price}>{formatNumberWithLetter(car.offer.price)} EVER</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
