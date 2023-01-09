import {AlwatrDummyElement, customElement, html, query} from '@alwatr/element';
import {fetch} from '@alwatr/fetch';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-file-uploader': AlwatrFileUploader;
  }
}

/**
 * Alwatr file uploader element.
 */
@customElement('alwatr-file-uploader')
export class AlwatrFileUploader extends AlwatrDummyElement {
  @query('.photo-form')
    photoForm: HTMLFormElement | undefined;

  @query('.photo-input')
    photoInput: HTMLInputElement | undefined;

  protected override firstUpdated(): void {
    this.photoForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (this.photoInput?.files == null) return;
      const file = this.photoInput.files[0];

      if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
        return;
      }

      const fileBlob = new Blob([file]);

      await fetch({
        url: 'http://localhost:8000',
        method: 'POST',
        body: fileBlob,
        headers: {
          'Content-Type': file.type,
        },
      });
    });
  }

  override render(): unknown {
    return html`
      <form class="photo-form">
        <input type="file" name="photo" class="photo-input">
        <input type="submit">
      </form>
    `;
  }
}
