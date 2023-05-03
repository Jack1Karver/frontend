import { observer } from 'mobx-react';
import headStyles from '@/components/header/scss/header.module.scss'
import Link from 'next/link';
import styles from './scss/signin.module.scss'
import Container from '../container/container';
import EverWalletIcon from '@/resources/img/wallets/ever-wallet.svg'
import EverWalletStore from '@/stores/ever-wallet-store';
import { EVER_WALLET_ERROR_MESSAGES } from '@/config/errors-messages.config';

const SignIn = observer(() => {

  const provider = {
    icon: <EverWalletIcon/>,
    platform: 'browser',
    // action: signInWithEverWallet,
    popular: false,
    disabled: false,
  };

  const signInWithEverWallet = async () => {
    if (EverWalletStore?.client && EverWalletStore?.isProperNetwork) {
      EverWalletStore?.connectWallet();
      try {
        await EverWalletStore.client.auth();
      } catch (error) {
        if (error instanceof Error) {
          const errorMessage = EVER_WALLET_ERROR_MESSAGES[error.message];
         
        } else {
          throw error;
        }
      }
    } else {
      
    }
  };

return (<>
   <header className={headStyles.header}>
      <div className={headStyles.header__content}>
        <Link className={headStyles.header__logo} href="/">
            <h3>Drivefy</h3>
        </Link>
        </div>
        </header>
        <div className={styles.signin__wrap}>
          <Container mod={'sm'}>
            <div className={styles.signin__form}>
            <div className={styles.signin__title}>
            <h2>Sign In to</h2> <h2 className={styles.signin__logo}>DRIVEFY</h2>
            </div>
            <div className={styles.signin__desc}>
              Sign in with your Non-castodial wallet
            </div>
            <div className={styles.signin}>
     
                <button className={styles.signin__item} onClick={signInWithEverWallet}>
                  <div className={styles['signin__item-icon']}>{provider.icon}</div>
                  <div className={styles['signin__item-title']}>EVER Wallet</div>
                  <div className={styles['signin__item-subtitle']}>browser extension</div>
                </button>
          
            </div>
            </div>
          </Container>
        </div>
</>)
});

export default SignIn;
