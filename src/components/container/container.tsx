import React, { ReactNode } from 'react';
import styles from 'src/components/container/scss/container.module.scss';

type ContainerPropTypes = {
    children: ReactNode;
    mobWide?: boolean;
    mod?: 'sm' | 'flex' | 'md' | 'lg';
    type?: 'divided' | 'divided-wide';
    height?: boolean;
}

export default function Container({ children, mobWide, mod, type, height }: ContainerPropTypes): JSX.Element {
  return <div className={`${styles.container} ${height ? styles['container--height'] : ''}  ${mod ? styles[`container--${mod}`] : ''} ${type ? styles[`container--${type}`] : ''} ${mobWide ? styles['container--mob-p-0'] : ''}`}>
    {children}
  </div>;
}
