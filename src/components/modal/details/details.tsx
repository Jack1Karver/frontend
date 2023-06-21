import React from 'react';
import styles from 'src/components/modal/details/scss/details.module.scss';

type DetailsRowProps = {
  children: string | React.ReactNode;
}

type DetailsItemProps = {
  label: string;
  value: string | React.ReactNode;
  reverse?: boolean;
  monochrome?: boolean;
}

type DetailsErrorProps = {
  error: string | React.ReactNode;
}

export function DetailsRow({ children }: DetailsRowProps): JSX.Element {
  return <div className={`${styles['details']}`}>
    {children}
  </div>;
}

export function DetailsItem({ label, value, reverse, monochrome }: DetailsItemProps): JSX.Element {
  return <div className={`${styles['details__item']} ${reverse ? styles['details__item--reverse'] : ''}`}>
    <div className={`${styles['details__title']} ${reverse ? styles['details__title--reverse'] : ''}`}>
      {label}
    </div>
    <div className={`${styles['details__value']} ${reverse ? styles['details__value--reverse'] : ''} ${monochrome ? styles['details__value--monochrome'] : ''}`}>
      {value}
    </div>
  </div>;
}

export function DetailsError({ error }: DetailsErrorProps): JSX.Element {
  return <div className={`${styles['details__item']}`}>
    <div className={`${styles['details__title']} ${styles['details__title--error']}`}>{error}</div>
  </div>;
}


