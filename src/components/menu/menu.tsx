import Link from 'next/link';

import styles from './scss/menu.module.scss';
import { MENU_ITEMS } from '../../config/menu.config';
import Button from '../button/button';
import Router from 'next/router';

const Menu = () => {
  return (
    <ul className={styles.menu}>
      {MENU_ITEMS.map((label, key) => {
        return (
          <li key={label.id} className={styles.menu__item}>
            {label.button ? (
              <Button size={'md'} mod={'brand'} onClick={() => Router.push(label.link)} content={label.title} />
            ) : (
              <Link href={label.link}>{label.title}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
