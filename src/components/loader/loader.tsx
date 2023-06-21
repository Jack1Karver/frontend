import React from 'react';
import styles from './scss/loader.module.scss';
import LoaderIcon from 'src/resources/img/loader.svg';
import LoaderXsIcon from 'src/resources/img/loader-xs.svg';

type LoaderProps = {
  size?: 'xxs' | 'xs';
  loading?: boolean;
}

export default function Loader({ size, loading = true }: LoaderProps): JSX.Element {
  return <div className={`${styles.loader} ${loading ? styles['loader__icon--animation'] : ''}`}>
    <div className={`${styles.loader__icon} ${size ? styles[`loader__icon--${size}`] : ''}`}>
      {size === 'xs' || size === 'xxs' ? <LoaderXsIcon/> : <LoaderIcon/>}
    </div>
  </div>;
}
