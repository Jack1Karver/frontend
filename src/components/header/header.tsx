import Link from 'next/link';
import styles from './scss/header.module.scss';
import { observer } from 'mobx-react';
import { COMMON_LABELS } from '@/config/labels.config';
import Router from 'next/router';
import Button from '../button/button';
import userStore from '@/stores/user-store';
import Menu from '../menu/menu';
import { ExtensionWalletAuthRequests } from '@/requests/extension-wallet-auth.request';
import { IAuthorizedUser} from '@/interfaces/user.interface';
import { useEffect, useState } from 'react';

type HeaderProps = {
  user: IAuthorizedUser | null
}

const Header = observer(({user}:HeaderProps) => {
  const [showLink, setShowLink] = useState(false)

   useEffect(()=>{
    if(user){
      setShowLink(true)
    }
  }, [user])

  const logout = async () => {
    await ExtensionWalletAuthRequests.logout();
    Router.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link className={styles.header__logo} href="/">
          <h3>Drivefy</h3>
        </Link>
        <div className={styles.header__menu}>
          <Menu />
        </div>
        <Button size={'md'} mod={'brand'} onClick={() => Router.push('/create')} content={'Create offer'} />
        <div className={styles.header__login}>
         
          {!showLink ? (
            <>
            <Button size={'sm'} onClick={() => Router.push('/signin')} content={COMMON_LABELS.login} />
            </>
          ) : (
            <>
              <Link href={{ pathname:'/user/[slug]', query:{ slug: `${user!.slug}`} }} className={styles.header__user}>{user!.name}</Link>
              <Button size={'sm'} onClick={logout} content={COMMON_LABELS.logout} />
            </>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
