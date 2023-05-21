import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';



import Button from '@/components/button/button'
import ModalStore from '@/stores/modal-store';
import ItemStore from '@/stores/car-store';
import UserStore from '@/stores/user-store';
import EverWalletStore from '@/stores/ever-wallet-store';
import { cancelOffer } from 'src/api-client/requests/offer-requests';

import styles from 'src/components/modal/scss/modal.module.scss';
import formStyles from 'src/components/forms/scss/form.module.scss';
import { closeModal, showTransactionLoader } from '@/utils/ui.utils';
import EverWalletControllerWeb from '@/external/EverWalletControllerWeb';
import { getEverWalletClient } from '@/utils/wallet/client';
import { notify, sprintf } from '@/utils/common.utils';


type CancelSaleProps = {
  carStore: ItemStore;
};

const CancelSale = observer(({ carStore }: CancelSaleProps) => {
  const { setIsShowModal } = ModalStore;
  const { car } = carStore;

  async function cancelSale() {
    showTransactionLoader();

    if (car.offer?.sellProxy) {
      return cancelOffer(car.offer.contractAddress);
    }

    if (!car.offer) {
      return closeModal();
    }

   
    const transactionResult = await new EverWalletControllerWeb(getEverWalletClient()).cancelSell(car.offer);

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
              __html: sprintf('Do you want to cancel the sale of <b>%s?</b>', `${car.carFeatures.model.mark.name} ${car.carFeatures.model.name}`),
            }}
          />

          <div className={styles['modal__btn-row']}>
            <Button
              size={'md'}
              mod={'brand'}
              className={styles.modal__btn}             
              onClick={cancelSale}
              content={'Confirm'}
            />
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


