import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';

import Button from '@/components/button/button';
import UserStore from '@/stores/user-store';

import styles from 'src/components/modal/scss/modal.module.scss';
import CarStore from '@/stores/car.store';
import { PutOnSaleStore } from '@/stores/put-on-sale.store';
import { getEverWalletClient } from '@/utils/wallet/client';
import EverWalletControllerWeb from '@/external/EverWalletControllerWeb';
import { closeModal, showTransactionLoader } from '@/utils/ui.utils';
import { notify, sprintf } from '@/utils/common.utils';
import { DetailsItem, DetailsRow } from '@/components/modal/details/details';
import Input from '@/components/input/input';
import { ICar } from '@/interfaces/car.interface';
import ModalStore from '@/stores/modal-store';

type PutOnSaleProps = {
  car: ICar;
  initialPrice?: number;
};

const PutOnSale = observer(({ car, initialPrice }: PutOnSaleProps) => {
  const putOnSaleStore = useMemo(() => new PutOnSaleStore(), [initialPrice]);
  const price = putOnSaleStore.price;
  const { setIsShowModal } = ModalStore;

  useEffect(() => {
    if (initialPrice) {
      putOnSaleStore.setPrice(+initialPrice);
    }
  }, []);

  async function sell() {
    if (!price || !UserStore.user) {
      return closeModal();
    }

    showTransactionLoader();

    const walletService = new EverWalletControllerWeb(getEverWalletClient());
    const transactionRes = await walletService.sellToken(car, price);

    if (transactionRes?.error) {
      notify(transactionRes?.error?.message!);
    }
    return closeModal();
  }

  const sellInfo = sprintf(
    'You are about to put your <b>%s</b> up for sale.',
    `${car.carFeatures.model.mark.name} ${car.carFeatures.model.name}`
  );

  return (
    <>
      <div className={styles.modal__header}>
        <div className={styles.modal__title}>{'Put on sale'}</div>
      </div>

      <>
        <div className={styles.modal__main}>
          <div
            className={`${styles['modal__main-content']} ${styles['modal__main-content--sm']}`}
            dangerouslySetInnerHTML={{ __html: sellInfo }}
          />

          <div className={`${styles.modal__field} ${styles['modal__field--group']} ${styles['modal__field--sm']}`}>
            <Input type={'number'} onChange={e => putOnSaleStore.setPrice(e.target.value)} placeholder={'Price'} />
          </div>
        </div>

        <div className={styles.modal__footer}>
          <div className={styles.modal__details}>
            <DetailsRow>
              <DetailsItem label={'Marketplace fee'} value={3 + '%'} />
              <DetailsItem
                label={'You will receive'}
                value={
                  <>
                    <b>{price ? <>{Number(price - price * 0.03).toLocaleString('en-US')} EVER</> : '...'}</b>
                  </>
                }
              />
            </DetailsRow>
          </div>

          <div className={`${styles.modal__field} ${styles['modal__field--sm']}`}>
            <div className={styles['modal__btn-row']}>
              <Button size={'md'} mod={'brand'} className={styles.modal__btn} onClick={sell} content={'Confirm'} />
              <Button
                size={'md'}
                mod={'empty'}
                className={styles.modal__btn}
                onClick={() => setIsShowModal(false)}
                content={'Close'}
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
});

export default PutOnSale;
