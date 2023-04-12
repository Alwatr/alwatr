import {customElement, css, SignalMixin, AlwatrBaseElement, UnresolvedMixin, html} from '@alwatr/element';
import {finiteStateMachineConsumer} from '@alwatr/fsm';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/surface.js';

import {buttons} from '../../manager/buttons.js';
import '../stuff/agency-info-form.js';

import type {AgencyInfoFsm} from '../../manager/controller/agency-info.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-agency-info': AlwatrPageAgencyInfo;
  }
}

/**
 * Alwatr Customer Order Management Agency Info Page
 */
@customElement('alwatr-page-agency-info')
export class AlwatrPageAgencyInfo extends UnresolvedMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }
  `;

  protected fsm = finiteStateMachineConsumer<AgencyInfoFsm>('agency_info_fsm_' + this.ali, 'agency_info_fsm');

  override connectedCallback(): void {
    super.connectedCallback();

    this._addSignalListeners(this.fsm.defineSignals([
      {
        signalId: buttons.submitAgencyInfoForm.clickSignalId,
        transition: 'submit',
      },
    ]));
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    return this.fsm.render({
      submittingAgencyInfo: 'agencyInfoForm',
      agencyInfoForm: () => {
        return html`
          <alwatr-surface tinted>
            <alwatr-agency-info-form .formData=${this.fsm.getContext().agencyInfo}></alwatr-agency-info-form>
          </alwatr-surface>
          <alwatr-button .content=${buttons.submitAgencyInfoForm}></alwatr-button>
        `;
      },
    });
  }
}
