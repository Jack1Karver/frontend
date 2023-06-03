import Layout from '@/components/layout/layout';
import MainScreenUser from '@/components/main-screen/main-screen-user';
import UserAds from '@/components/user-ads/user-ads';
import { IUser } from '@/interfaces/user.interface';
import { fetchUserBySlug } from '@/requests/user-requests';
import { GetServerSideProps } from 'next';

type UserProps = {
  user: IUser;
};

export default function User({ user }: UserProps){
  return (
    <Layout>
      <>
        <MainScreenUser user={user} />
        <UserAds user={user} />
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { slug } = context.query;
  let user;

  if (typeof slug === 'string') {
    user = await fetchUserBySlug(slug);
  }
  if (!user) {
    return { notFound: true };
  }

  return {
    props: {
      user,
    },
  };
};
