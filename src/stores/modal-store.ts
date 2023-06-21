import React from 'react';
import { action, makeObservable, observable } from 'mobx';

class ModalStore {
  warning: string = '';
  isShowModal = false;
  processingModal = false;
  modalContent: React.ReactNode | string = '';
  scrollbarWidth = 0;
  isShowMobileMenu = false;
  loading = false;
  isTransactionLoading = false;
  isDisabled = false;
  modalSize = 'sm';
  isThemeUsed = false;
  isTable = false;
  isFullWidth = false;
  isAdaptiveHeight = false;
  modalControlsContent: React.ReactNode | string = '';

  constructor() {
    makeObservable(this, {
      isDisabled: observable,
      warning: observable,
      isShowModal: observable,
      processingModal: observable,
      modalContent: observable,
      scrollbarWidth: observable,
      isShowMobileMenu: observable,
      loading: observable,
      isTransactionLoading: observable,
      isThemeUsed: observable,
      isTable: observable,
      isFullWidth: observable,
      isAdaptiveHeight: observable,
      modalControlsContent: observable,
      setProcessingModal: action,
      setIsShowMobileMenu: action,
      setLoading: action,
      setWarning: action,
      setIsShowModal: action,
      setModalContent: action,
      setScrollbarWidth: action,
      setIsDisabled: action,
      setModalSize: action,
      setIsTransactionLoading: action,
      setIsThemeUsed: action,
      setIsTable: action,
      setIsFullWidth: action,
      setIsAdaptiveHeight: action,
      setModalControlsContent: action,
    });
  }

  setModalSize = (size: 'lg' | 'sm') => {
    this.modalSize = size;
  };

  setIsDisabled = (isDisabled: boolean) => {
    this.isDisabled = isDisabled;
  };

  setWarning = (warning: string) => {
    this.warning = warning;
  };

  setLoading = (isLoading: boolean) => {
    this.loading = isLoading;

    if (!isLoading) {
      this.warning = '';
    }
  };

  setIsShowModal = (isShow: boolean) => {
    this.isShowModal = isShow;
  };

  setIsShowMobileMenu = (isShow: boolean) => {
    this.isShowMobileMenu = isShow;
  };

  setIsAdaptiveHeight = (isAdaptiveHeight: boolean) => {
    this.isAdaptiveHeight = isAdaptiveHeight;
  };

  setProcessingModal = (isProcessing: boolean) => {
    this.processingModal = isProcessing;
  };

  setModalContent = (content: React.ReactNode | string) => {
    this.modalContent = content;
  };

  setScrollbarWidth = (width: number) => {
    this.scrollbarWidth = width;
  };

  setIsTransactionLoading = (isTransactionLoading: boolean) => {
    this.isTransactionLoading = isTransactionLoading;
  };

  setIsThemeUsed = (isThemeUsed: boolean) => {
    this.isThemeUsed = isThemeUsed;
  };

  setIsTable = (isTable: boolean) => {
    this.isTable = isTable;
  };

  setIsFullWidth = (isFullWidth: boolean) => {
    this.isFullWidth = isFullWidth;
  };

  setModalControlsContent = (content: React.ReactNode | string) => {
    this.modalControlsContent = content;
  };
}

export default new ModalStore();
