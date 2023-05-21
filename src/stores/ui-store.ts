import { action, makeObservable, observable } from 'mobx';

type TBreakpoints = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

class UiStore {
  isShowTopLoader = false;
  preventClosing = false;
  windowSize = 0;
  breakpoint: TBreakpoints = 'xxl';

  constructor() {
    makeObservable(this, {
      preventClosing: observable,
      isShowTopLoader: observable,
      windowSize: observable,
      breakpoint: observable,
      setWindowSize: action,
      setShowTopLoader: action,
      setPreventClosing: action,
      setBreakpoint: action,
    });
    this.addListeners();

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', e => {
        if (this.preventClosing) {
          e.preventDefault();
          e.returnValue = false;
        }
      });
    }
  }

  setBreakpoint = (width: number) => {
    if (width < 576) {
      this.breakpoint = 'xxs';
    } else if (width >= 576 && width < 768) {
      this.breakpoint = 'xs';
    } else if (width >= 768 && width < 992) {
      this.breakpoint = 'sm';
    } else if (width >= 992 && width < 1200) {
      this.breakpoint = 'md';
    } else if (width >= 1200 && width < 1400) {
      this.breakpoint = 'lg';
    } else if (width >= 1400 && width < 1680) {
      this.breakpoint = 'xl';
    } else if (width >= 1680) {
      this.breakpoint = 'xxl';
    }
  };

  setPreventClosing = (isPreventClosing: boolean) => {
    this.preventClosing = isPreventClosing;
  };

  addListeners = () => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const width = window.innerWidth;
        this.setWindowSize(width);
        this.setBreakpoint(width);
      };

      window.addEventListener('resize', handleResize);
      handleResize();
    }
  };

  setWindowSize = (size: number) => {
    this.windowSize = size;
  };

  setShowTopLoader = (isShow: boolean) => {
    this.isShowTopLoader = isShow;
  };
}

export default new UiStore();
