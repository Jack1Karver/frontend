import React, { ReactElement } from 'react';

import styles from 'src/components/loader/scss/loader.module.scss';

type LoaderProps = {
  modBG?: 'light' | 'dark';
  height?: boolean;
}

export default function DotsLoader({ modBG, height } : LoaderProps) : ReactElement {
  return (
    <div className={`${styles.loader__dots} ${modBG ? styles[`loader__dots--${modBG}`] : ''} ${height ? styles['loader__dots--height'] : ''}`}>
      <span/><span/><span/>
    </div>
  );
}
