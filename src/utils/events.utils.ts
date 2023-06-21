import { MAIN_NET } from '../config/everscale.config';

class DealerEvent {
  private static createEvent(eventName: string): void {
    const event = new CustomEvent(`Dealer.event.${eventName}`);
    document.dispatchEvent(event);
  }

  static registrationEvent(): void {
    DealerEvent.createEvent('registration');
  }

  static buyEvent(): void {
    DealerEvent.createEvent('buy');
  }

  static connectWalletEvent(): void {
    DealerEvent.createEvent('connect_wallet');
  }

  static createItemEvent(): void {
    DealerEvent.createEvent('create_item');
  }
}

// test events
if (typeof document !== 'undefined' && !MAIN_NET) {
  document.addEventListener('Dealer.event.registration', () => {
    console.log('registration');
  });

  document.addEventListener('Dealer.event.buy', () => {
    console.log('buy');
  });

  document.addEventListener('Dealer.event.connect_wallet', () => {
    console.log('connect_wallet');
  });

  document.addEventListener('Dealer.event.create_item', () => {
    console.log('create_item');
  });
}

export default DealerEvent;
