import React, { ReactNode } from 'react';
import styles from './scss/block-head.module.scss';

type BlockHeadProps = {
  type?: 'columns' | 'default' ;
  title?: string;
  right?: ReactNode;
  left?: ReactNode;
  slider?: boolean;
  align?: 'left';
  heading?: 'main' | 'head';
  subHead?: string;
  headRow?: boolean;
}

export default function BlockHead({ type = 'default', title, right, left, slider, align, heading, subHead, headRow }: BlockHeadProps): JSX.Element {
  return (
    <div className={`${styles.block__head} ${align ? styles[`block__head--${align}`] : ''} ${
      slider ? styles['block__head--slider'] : ''} ${(left || right) ? styles['block__head--columns'] : ''} ${
      heading ? styles[`block__head--${heading}`] : ''} ${subHead ? styles['block__head--sub'] : ''}
      `} >
      {type === 'columns' && <div className={styles['block__head-row']}>
        <div className={styles['block__head-col']}>
          {left}
        </div>
        <div className={styles['block__head-col']}>
          {right}
        </div>
      </div>}
      {type === 'default' && <>
        {title && <h2 dangerouslySetInnerHTML={{ __html: title }} />}
        {subHead && <div className={styles['block__head-sub']} dangerouslySetInnerHTML={{ __html: subHead }} />}
        {(left || right) && <div className={`${styles['block__head-row']} ${headRow ? styles['block__head-row--row'] : ''}`}>
          <div className={styles['block__head-col']}>
            {left}
          </div>
          <div className={styles['block__head-col']}>
            {right}
          </div>
        </div>}
      </>}
    </div>
  );
}
