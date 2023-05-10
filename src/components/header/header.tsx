import Link from 'next/link';
import styles from './scss/header.module.scss';
import { observer } from 'mobx-react';
import { COMMON_LABELS } from '@/config/labels.config';
import  Router  from 'next/router';
import Button from '../button/button';
import userStore from '@/stores/user-store';
import Menu from '../menu/menu';

const Header = observer(() => {
  const {user} = userStore

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link className={styles.header__logo} href="/">
            <h3>Drivefy</h3>
        </Link>
        <div className={styles.header__menu}>
          <Menu/>
        </div>
        <div className={styles.header__login}>
          {/* {userAuthorized ? (
            <>
              <Link href={{ pathname:'/profile/[userName]', query:{ userName: `${userAuthorized.userName}` } }}>
                <a className={styles.header__user}>{userAuthorized.userName}</a>
              </Link>
              <Button size={'xs'} onClick={logout} content={COMMON_LABELS.logout} />
            </>
          ) : (
           
          )} */}
          {!user ? <Button size={'sm'} onClick={() => Router.push('/signin')} content={COMMON_LABELS.login} /> : <span className={styles.header__user}>{user.name}</span>}
          
        </div>
      </div>
    </header>
  );
});

export default Header;
