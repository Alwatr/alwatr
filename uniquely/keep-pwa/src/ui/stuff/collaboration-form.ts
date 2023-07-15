import {customElement, css, html, property, LocalizeMixin, SignalMixin, AlwatrBaseElement} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {submitFormCommandTrigger} from '../../manager/context.js';

import type {RadioGroupOptions} from '@alwatr/ui-kit/radio-group/radio-group.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-collaboration-form': AlwatrCollaborationForm;
  }
}

/**
 * Soffit collaboration form element
 *
 * @attr {Boolean} invisible
 */
@customElement('alwatr-collaboration-form')
export class AlwatrCollaborationForm extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static formId = 'collaboration';

  get _radioGroupOptions(): RadioGroupOptions {
    return {
      title: message('activity_field'),
      radioGroup: [
        {label: message('tool_distribution'), value: 'tool_distribution'},
        {label: message('sales_tools'), value: 'sales_tools'},
        {label: message('stonemason'), value: 'stonemason'},
        {label: message('contractor'), value: 'contractor'},
      ],
    };
  }

  static override styles = css`
    :host {
      display: block;
      transition: opacity var(--sys-motion-duration-medium) var(--sys-motion-easing-normal);
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: var(--sys-surface-disabled-opacity);
    }

    alwatr-text-field {
      display: block;
      margin-top: var(--sys-spacing-track);
    }
    alwatr-text-field:first-of-type {
      margin-top: 0;
    }

    :host([invisible]) * {
      opacity: 0;
    }

    .button-container {
      display: flex;
      flex-direction: row-reverse;
      gap: var(--sys-spacing-track);
      margin-top: var(--sys-spacing-track);
    }
  `;

  @property({type: Boolean, reflect: true})
    disabled = false;

  protected async submit(): Promise<void> {
    const bodyJson = this.getFormData();
    this._logger.logMethodArgs?.('submit', bodyJson);

    this.disabled = true;

    const response = await submitFormCommandTrigger.requestWithResponse({
      formId: (this.constructor as typeof AlwatrCollaborationForm).formId,
      data: bodyJson,
    });

    if (response) {
      this.dispatchEvent(new CustomEvent('form-submitted'));
    }
    else {
      this.disabled = false;
    }
  }

  protected cancel(): void {
    this.dispatchEvent(new CustomEvent('form-canceled'));
  }

  protected getFormData(): Record<string, string | number | boolean> {
    this._logger.logMethod?.('getFormData');
    const data: Record<string, string> = {};
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField>(
        'alwatr-text-field,alwatr-radio-group',
    )) {
      data[inputElement.name] = inputElement.value;
    }
    return data;
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return [
      this.inputTemplate(),
      this.partButtonTemplate(),
    ];
  }

  protected inputTemplate(): unknown {
    this._logger.logMethod?.('render');
    return html`
      <alwatr-text-field
        .name=${'name'}
        .type=${'text'}
        .placeholder=${message('full_name')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-text-field
        .name=${'phone'}
        .type=${'tel'}
        .placeholder=${message('phone_number')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-text-field
        .name=${'city'}
        .type=${'text'}
        .placeholder=${message('city')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-radio-group
        .name=${'activity'}
        .options=${this._radioGroupOptions}
      ></alwatr-radio-group>
    `;
  }

  protected partButtonTemplate(): unknown {
    return html`
      <div class="button-container">
        <alwatr-button .content=${{labelKey: 'submit_form'}} @click=${this.submit} outlined></alwatr-button>
        <alwatr-button .content=${{labelKey: 'cancel'}} @click=${this.cancel}></alwatr-button>
      </div>
    `;
  }

  async animateExpand(): Promise<void> {
    for (const element of this.renderRoot.querySelectorAll<HTMLElement>('*')) {
      element.style.opacity = '1';
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async animateCollapse(): Promise<void> {
    for (const element of [...this.renderRoot.querySelectorAll<HTMLElement>('*')].reverse()) {
      element.style.opacity = '0';
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
  }
}
