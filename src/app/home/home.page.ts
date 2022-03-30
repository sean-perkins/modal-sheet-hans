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

  breakpoints = [0, 0.25, 0.5];

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

  confirmPayment() {
    this.confirmedPayment = true;
    this.breakpoints = [0, 0.25];
  }

}
