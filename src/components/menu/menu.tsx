import Link from 'next/link';

import styles from './scss/menu.module.scss';
import { MENU_ITEMS } from '../../config/menu.config';

const Menu = () => {

  return (
    <ul className={styles.menu}>
      {MENU_ITEMS.map((label, key) => {
        
        return (
          <li key={label.id} className={styles.menu__item}>
            <Link href={label.link}>
              {label.title}
            </Link>
          </li>
        );
      })}
    </ul>
    
  );
};

export default Menu;
