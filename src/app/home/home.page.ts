import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalBreakpointChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  @ViewChild('sheetModal') sheetModal: IonModal;
  @ViewChild('paidModal') paidModal: IonModal;

  showPaymentInformation = false;
  confirmedPayment = false;

  moveToBreakpoint(breakpoint: number) {
    this.sheetModal.setCurrentBreakpoint(breakpoint);
  }

  breakpointDidChange(ev: CustomEvent<ModalBreakpointChangeEventDetail>) {
    const { breakpoint } = ev.detail;
    if (breakpoint === 0.5) {
      /**
       * If the sheet is expanded to the 0.5 breakpoint, we want to display the information
       * of where to send money to.
       */
      this.showPaymentInformation = true;
    } else {
      this.showPaymentInformation = false;
    }
  }

  async confirmPayment() {
    this.confirmedPayment = true;
    await Promise.all([
      this.paidModal.present(),
      this.sheetModal.setCurrentBreakpoint(0.25)
    ]);
    requestAnimationFrame(() => {
      this.sheetModal.dismiss();
    });
  }

}
