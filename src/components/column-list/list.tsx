import { ReactElement } from 'react';

import styles from './scss/list.module.scss';

type ListColumnsProps = {
  items: ReactElement[];
};

const ListColumns = ({ items }: ListColumnsProps) => {
  return (
    <ol className={styles.list}>
      {items.map((item, index) => {
        return <li className={styles.list__item} key={index}>{item}</li>;
      })}
    </ol>
  );
};

export default ListColumns;
