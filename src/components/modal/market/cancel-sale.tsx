import React from 'react';
import { observer } from 'mobx-react';

import Button from '@/components/button/button';
import ModalStore from '@/stores/modal-store';

import styles from 'src/components/modal/scss/modal.module.scss';
import { closeModal} from '@/utils/ui.utils';
import EverWalletControllerWeb from '@/external/EverWalletControllerWeb';
import { getEverWalletClient } from '@/utils/wallet/client';
import { notify, sprintf } from '@/utils/common.utils';
import { ICar } from '@/interfaces/car.interface';

type CancelSaleProps = {
  car: ICar;
};

const CancelSale = observer(({ car }: CancelSaleProps) => {
  const { setIsShowModal } = ModalStore;

  async function cancelSale() {
    if (!car.offer) {
      return closeModal();
    }
    const transactionResult = await new EverWalletControllerWeb(getEverWalletClient()).cancelSell(car.offer);
    console.log(transactionResult);
    if (transactionResult?.error) {
      notify(transactionResult?.error?.message!);

      return closeModal();
    }
  }

  return (
    <>
      <div className={styles.modal__header}>
        <div className={styles.modal__title}>{'Cancel sale'}</div>
      </div>

      <div className={styles.modal__main}>
        <div
          className={styles['modal__main-content']}
          dangerouslySetInnerHTML={{
            __html: sprintf(
              'Do you want to cancel the sale of <b>%s?</b>',
              `${car.carFeatures.model.mark.name} ${car.carFeatures.model.name}`
            ),
          }}
        />

        <div className={styles['modal__btn-row']}>
          <Button size={'md'} mod={'brand'} className={styles.modal__btn} onClick={cancelSale} content={'Confirm'} />
          <Button
            size={'md'}
            mod={'empty'}
            className={styles.modal__btn}
            onClick={() => setIsShowModal(false)}
            content={'Close'}
          />
        </div>
      </div>
    </>
  );
});

export default CancelSale;
