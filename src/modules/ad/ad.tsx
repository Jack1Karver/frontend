import Block from '@/components/block/block';
import CarStore from '@/stores/car.store';
import { observer } from 'mobx-react';
import styles from './scss/styles.module.scss';
import { useEffect, useState } from 'react';
import UserStore from '@/stores/user-store';
import Button from '@/components/button/button';
import ModalStore from '@/stores/modal-store';
import dynamic from 'next/dynamic';
import { AD_PARAMS } from './config/params.config';
import Link from 'next/link';
import moment from 'moment';

type AdPageProps = {
  carStore: CarStore;
};

const AdPage = observer(({ carStore }: AdPageProps) => {
  const { car } = carStore;
  const DynamicPutOnSale = dynamic(() => import('@/components/modal/market/put-on-sale'), { ssr: false });
  const DynamicCancelSale = dynamic(() => import('@/components/modal/market/cancel-sale'), { ssr: false });
  const DynamicPurchase = dynamic(() => import('@/components/modal/market/purchase-item'), { ssr: false });
  const {user} = UserStore;
  const [activePhoto, setActivePhoto] = useState<number>(0);

  const [isLogged, setIsLogged] = useState(false)

  useEffect(()=>{
    setIsLogged(!!user)
  })

  const putOnSale = () => {

    ModalStore.setIsShowModal(true);
    ModalStore.setModalContent(<DynamicPutOnSale car={car} />);
  };

  const cancelSale = () => {  
    ModalStore.setIsShowModal(true);
    ModalStore.setModalContent(<DynamicCancelSale car={car} />);
  };

  const purchase = () => {  
    ModalStore.setIsShowModal(true);
    ModalStore.setModalContent(<DynamicPurchase car={car} />);
  };

  return (
    <Block first={true} bg={'light'}>
      <div className={styles.ad}>
        <div className={styles.ad__photos}>
          <div className={styles.ad__photo}>
            <img src={`data:image/png;base64,${car.files[activePhoto]}`} alt={''} />
          </div>
          <div className={styles.ad__small_photos}>
            {car.files.map((file, index )=> {
              return (
                <div className={`${styles.ad__small_photo} ${activePhoto === index ?styles['ad__small_photo--active'] : ''}`} >
                  <img key={index} src={`data:image/png;base64,${file}`} alt={''} onClick={(e) => setActivePhoto(index)} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.ad__description}>
          <h4>{`${car.carFeatures.model.mark.name} ${car.carFeatures.model.name} (${car.carFeatures.yearProd})`}</h4>
          <div className={styles.ad__owner_block}>
            Owner:{' '}
            <Link className={styles.ad__owner} href={`user/${car.owner.slug}`}>
              {car.owner.name}
            </Link>
          </div>
          <div className={styles.ad__price}>
            {car.offer ? (
              <>
                <h3>{car.offer.price}</h3>
                <h5>EVER</h5>
                {isLogged ?<>{ user?.slug === car.owner.slug ? (
                  <Button size={'wide'} mod={'brand'} content={'Cancel sale'} onClick={cancelSale}/>
                ) : (
                  <Button size={'wide'} mod={'brand'} content={'Purchase'} onClick={purchase}/>
                )}</> : ''}
                
              </>
            ) : (
              <>
                <h3>Not for sale</h3>
                {isLogged ? <>{user?.slug === car.owner.slug ? (
                  <Button size={'wide'} mod={'brand'} content={'Put on sale'} onClick={ putOnSale} />
                ) : (
                  ''
                )}</>: ''}
                
              </>
            )}
          </div>
          <div className={styles.ad__params}>
            {AD_PARAMS.map(parameter => {
              return (
                <div className={styles.ad__parameter}>
                  <div className={styles['ad__parameter--name']}>{parameter.label}</div>
                  <div className={styles['ad__parameter--value']}>{car.carFeatures[parameter.id]}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.ad__about}>
          <div className={styles.ad__about_parameter}>
            <div className={styles['ad__about_parameter--name']}>{'Created at'}</div>
            <div className={styles['ad__about_parameter--value']}>
              {car.dateCreated ? moment(car.dateCreated).format('DD MMMM YYYY') : '2023'}
            </div>
          </div>

          <div className={styles.ad__about_parameter}>
            <div className={styles['ad__about_parameter--name']}>{'Description'}</div>
            <div className={styles['ad__about_parameter--value']}>
              {car.description ? car.description : 'Empty'}
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
});

export default AdPage;
