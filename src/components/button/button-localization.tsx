import Link from 'next/link';
import { useRouter } from 'next/router';

const ButtonLocalization = () => {
  const Router = useRouter();

  return (
    <Link href={{ pathname: Router.pathname, query: Router.query }} locale={Router.locale == 'ru' ? 'en' : 'ru'}>
      {Router.locale}
    </Link>
  );
};

export default ButtonLocalization;
