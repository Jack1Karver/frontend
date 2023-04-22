import Link from 'next/link';
import styles from './scss/header.module.scss';
import Menu from '../menu/menu';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import UserAuthorizedStore from '../../stores/user.authorized.store';
import Button from '../button/button';
import Router from 'next/router';
import { COMMON_LABELS } from '../../config/labels.config';



const Header = observer(() => {
  const { userAuthorized, logout } = useMemo(() => new UserAuthorizedStore(), []);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/">
          <a className={styles.header__logo}>
            <h1>Book2Book</h1>
          </a>
        </Link>
        <div className={styles.header__menu}>
          <Menu user={userAuthorized}/>
        </div>
        <div className={styles.header__login}>
          {userAuthorized ? (
            <>
              <Link href={{ pathname:'/profile/[userName]', query:{ userName: `${userAuthorized.userName}` } }}>
                <a className={styles.header__user}>{userAuthorized.userName}</a>
              </Link>
              <Button size={'xs'} onClick={logout} content={COMMON_LABELS.logout} />
            </>
          ) : (
            <Button size={'xs'} onClick={() => Router.push('/login')} content={COMMON_LABELS.login} />
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
