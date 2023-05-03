import { ReactElement } from 'react';
import Block from '../block/block';
import Footer from '../footer/footer';
import Header from '../header/header';

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps):ReactElement => {
  return (
    <>
      <Header />
      <main>
          {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
