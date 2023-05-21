import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';


import ModalStore from '@/stores/modal-store';
import styles from 'src/components/modal/scss/modal.module.scss';
import Close from 'src/resources/img/close.svg';
import { getPathWithoutParams } from '@/utils/common.utils';

/*
to open:
const { setIsShowModal, setModalContent } = ModalStore;
setModalContent(<ContentComponent/>);
setIsShowModal(true);
(ModalToggler or ButtonModal)

to close:
const { setIsShowModal } = ModalStore;
setIsShowModal(false)
*/

const Modal = observer(() => {
  const router = useRouter();
  const [closingModal, setClosingModal] = useState(false);
  const {
    isShowModal,
    setIsShowModal,
    modalContent,
    isShowMobileMenu,
    setIsShowMobileMenu,
    setProcessingModal,
    setScrollbarWidth,
    setIsTransactionLoading,
    setIsThemeUsed,
    isThemeUsed,
    modalSize,
    isTable,
    isFullWidth,
    isAdaptiveHeight,
    modalControlsContent,
    setIsFullWidth,
    setIsAdaptiveHeight,
    setIsTable,
    setModalSize,
    setModalControlsContent,
  } = ModalStore;

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  let modalOverlayClasses = `${styles.modal__overlay}`;
  let modalPopupClasses = `${styles.modal__popup}`;
  let modalContentClasses = `${styles.modal__content}`;

  if (isFullWidth) {
    modalContentClasses += ` ${styles['modal__content--full']}`;
    modalOverlayClasses += ` ${styles['modal__overlay--full']}`;
    modalPopupClasses += ` ${styles['modal__popup--full']}`;
  }

  // to close the modal on page switching and keep it open when only query params change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const urlWithoutLocale = url.replace(`/${router.locale}/`, '/');
      if (getPathWithoutParams(router.asPath) !== getPathWithoutParams(urlWithoutLocale)) {
        ModalStore.setIsShowModal(false);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const openModal = () => {
      if (isShowMobileMenu) {
        setIsShowMobileMenu(false);
      }

      const body = document.body;


        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        body.style.paddingRight = scrollbarWidth + 'px';
        body.classList.add('modal-open');
        setProcessingModal(true);
        setScrollbarWidth(scrollbarWidth);
  

      setTimeout(() => {
        setIsOpenModal(isShowModal);
      }, 200);
    };

    const closeModal = () => {
      setIsOpenModal(false);
      setProcessingModal(true);
      setIsTransactionLoading(false);
      setClosingModal(!closingModal);
      setModalControlsContent('');
      setTimeout(() => {
        setIsThemeUsed(false);
        setIsTable(false);
        setIsFullWidth(false);
        setIsAdaptiveHeight(false);
      }, 500);

      const body = document.body;

      setTimeout(() => {
        setClosingModal(closingModal);
        setProcessingModal(false);
        body.classList.remove('modal-open');
        body.style.paddingRight = '';
      }, 200);
    };

    isShowModal ? openModal() : closeModal();
  }, [isShowModal]);

  const closeModalByClick = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current || e.target === closeBtnRef.current) {
      setIsShowModal(false);
      setIsTransactionLoading(false);
      setModalControlsContent('');
      setModalSize('sm');
      setTimeout(() => {
        setIsThemeUsed(false);
        setIsTable(false);
        setIsFullWidth(false);
        setIsAdaptiveHeight(false);
      }, 500);
    }
  };

  return (
    <div
      className={`${styles.modal} ${isOpenModal ? styles.show : ''} ${
        closingModal ? `${styles.show} ${styles.out} ${isFullWidth ? styles['out--full'] : ''}` : ''
      }`}
    >
      {(isOpenModal || isFullWidth) && (
        <div className={modalOverlayClasses} ref={overlayRef} onClick={closeModalByClick}>
          <div className={modalPopupClasses}>
            <div
              ref={modalRef}
              className={`${modalContentClasses} ${
                isAdaptiveHeight && isFullWidth ? styles['modal__content--adaptive-height'] : ''
              } ${isTable ? styles['modal__content--table'] : ''} ${
                isThemeUsed ? styles['modal__content--themed'] : ''
              } ${styles[`modal__content--${modalSize}`]}`}
            >
              {!isFullWidth && (
                <button ref={closeBtnRef} className={styles.modal__close} onClick={closeModalByClick}>
                  <Close />
                </button>
              )}
              {isFullWidth && (
                <div className={styles.modal__hide}>
                  <button ref={closeBtnRef} onClick={closeModalByClick} />
                </div>
              )}
              {modalContent}
              {modalControlsContent && <div className={styles.modal__controls}>{modalControlsContent}</div>}
            </div>
          </div>          
        </div>
      )}
    </div>
  );
});

export default Modal;
