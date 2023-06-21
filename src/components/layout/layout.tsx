import { ReactElement } from 'react';
import Block from '../block/block';
import Footer from '../footer/footer';
import Header from '../header/header';
import userStore from '@/stores/user-store';

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps):ReactElement => {
  const user = userStore.user
  return (
    <>
      <Header user = {user}/>
      <main>
          {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
