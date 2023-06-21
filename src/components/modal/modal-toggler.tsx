import React, { ReactNode } from 'react';
import styles from 'src/components/modal/scss/modal.module.scss';
import { observer } from 'mobx-react';
import ModalStore from '@/stores/modal-store';

type ModalTogglerProps = {
  children: React.ReactNode;
  modalContent: ReactNode;
  className: string;
  disabled?: boolean;
};

const ModalToggler = observer(({ children, modalContent, className, disabled }: ModalTogglerProps) => {
  const openModal = (isShowModal: boolean) => {
    ModalStore.setModalContent(modalContent);
    ModalStore.setIsShowModal(isShowModal);
  };

  return (
    <div
      className={`${className} ${styles['modal-toggler']} ${disabled ? styles['modal-toggler--disabled'] : ''}`}
      onClick={() => openModal(true)}
    >
      {children}
    </div>
  );
});

export default ModalToggler;
