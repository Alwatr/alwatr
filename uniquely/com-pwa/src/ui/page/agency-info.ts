import {customElement, css, SignalMixin, AlwatrBaseElement, UnresolvedMixin, html, state} from '@alwatr/element';
import {finiteStateMachineConsumer} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/surface.js';

import {buttons} from '../../manager/buttons.js';
import '../stuff/agency-info-form.js';

import type {AgencyInfoFsm} from '../../manager/controller/agency-info.js';
import type {IconBoxContent} from '@alwatr/ui-kit/src/card/icon-box.js';

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

  @state()
    gotState = this.fsm.getState().target;

  override connectedCallback(): void {
    super.connectedCallback();

    this._addSignalListeners(this.fsm.defineSignals([
      {
        callback: (): void => {
          const state = this.fsm.getState();
          this.gotState = state.target;
        },
        receivePrevious: 'NextCycle',
      },
      {
        signalId: buttons.submitAgencyInfoForm.clickSignalId,
        transition: 'submit',
      },
      {
        signalId: buttons.retry.clickSignalId,
        transition: 'retry',
      },
    ]));
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    return this.fsm.render({
      agencyInfoForm: () => {
        return html`
          <alwatr-surface tinted>
            <alwatr-agency-info-form .formData=${this.fsm.getContext().agencyInfo}></alwatr-agency-info-form>
          </alwatr-surface>
          <alwatr-button .content=${buttons.submitAgencyInfoForm}></alwatr-button>
        `;
      },

      submitting: () => {
        const content: IconBoxContent = {
          headline: message('page_agency_info_submitting_message'),
          icon: 'cloud-upload-outline',
          tinted: 1,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },

      submitSuccess: () => {
        const content: IconBoxContent = {
          headline: message('page_agency_info_submit_success_message'),
          icon: 'cloud-done-outline',
          tinted: 1,
        };
        return [
          html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`,
        ];
      },

      submitFailed: () => {
        const content: IconBoxContent = {
          headline: message('page_agency_info_submit_failed_message'),
          icon: 'cloud-offline-outline',
          tinted: 1,
        };
        return [
          html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`,
          html`
            <div class="submit-container">
              <alwatr-button .content=${buttons.retry}></alwatr-button>
            </div>
          `,
        ];
      },
    });
  }
}
