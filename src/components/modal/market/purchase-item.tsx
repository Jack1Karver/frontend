import React from 'react';
import { observer } from 'mobx-react';

import Button from '@/components/button/button';

import UserStore from '@/stores/user-store';
import styles from 'src/components/modal/scss/modal.module.scss';

import { closeModal, showTransactionLoader } from '@/utils/ui.utils';
import { getEverWalletClient } from '@/utils/wallet/client';
import EverWalletControllerWeb from '@/external/EverWalletControllerWeb';
import { notify } from '@/utils/common.utils';
import CarStore from '@/stores/car-store';
import Link from 'next/link';
import { DetailsItem, DetailsRow } from '@/components/modal/details/details';

type PurchasePackProps = {
  carStore: CarStore;
};

const PurchaseItem = observer(({ carStore }: PurchasePackProps) => {
  const { user } = UserStore;
  const { car } = carStore;

  const buy = async () => {
    showTransactionLoader();

    const walletService = new EverWalletControllerWeb(getEverWalletClient());
    const transactionRes = await walletService.buyToken(car);

    if (transactionRes?.error) {
      notify(transactionRes?.error?.message!);
      return closeModal();
    }
  };

  return (
    <>
      <div className={styles.modal__header}>
        <div className={styles.modal__title}>{'Purchase'}</div>
      </div>
      <>
        <div className={styles.modal__main}>
          <div className={`${styles['modal__main-content']} ${styles['modal__main-content--sm']}`}>
            {'You are about to purchase'}&nbsp;
            <b>{`${car.carFeatures.model.mark.name} ${car.carFeatures.model.name}`}</b>&nbsp;
            {'from'}&nbsp;
            <Link href={`/user/${car.owner.slug}`}>{car.owner.name}</Link>
          </div>
        </div>
        <div className={styles.modal__footer}>
          {car.offer?.price && (
            <div className={styles.modal__details}>
              <DetailsRow>
                  <DetailsItem
                    label={'You will pay'}
                    value={
                      <>
                        <b>
                         {car.offer.price}
                        </b>
                        &nbsp;
                        {'EVER'}
                      </>
                    }
                  />
                </DetailsRow>
            </div>
          )}
          <Button size={'sm'} mod={'brand'} className={styles.modal__btn} onClick={buy} content={'Purchase'} />
        </div>
      </>
    </>
  );
});

export default PurchaseItem;

