import React from 'react';
import Router from 'next/router';

import { notify } from './common.utils';
import ModalStore from '@/stores/modal-store';
import UiStore from '@/stores/ui-store';

export const closeModal = () => {
  ModalStore.setIsShowModal(false);
  ModalStore.setIsTransactionLoading(false);
  ModalStore.setLoading(false);
  UiStore.setPreventClosing(false);
  ModalStore.setModalControlsContent('');
  setTimeout(() => {
    ModalStore.setIsThemeUsed(false);
    ModalStore.setIsTable(false);
    ModalStore.setIsFullWidth(false);
    ModalStore.setIsAdaptiveHeight(false);
  }, 500);
};

export const showTransactionLoader = () => {
  ModalStore.setIsTransactionLoading(true);
  UiStore.setPreventClosing(true);
};

export const hideTransactionLoader = () => {
  ModalStore.setIsTransactionLoading(false);
  UiStore.setPreventClosing(false);
};

export const showLoader = () => {
  ModalStore.setLoading(true);
  UiStore.setPreventClosing(true);
};

export const copyToClipBoard = async (ref: React.RefObject<HTMLSpanElement>, attributeName = 'data-clipboard') => {
  if (ref.current) {
    const text = ref.current.getAttribute(attributeName);

    if (text) {
      await navigator.clipboard.writeText(text);

      if (typeof window !== 'undefined') {
        notify('Copied to clipboard!');
      }
    }
  }
};
