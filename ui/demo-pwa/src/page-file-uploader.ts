import {AlwatrDummyElement, customElement, html, query} from '@alwatr/element';
import {serviceRequest} from '@alwatr/fetch';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/fetch';
import type {Photo, PhotoMeta} from '@alwatr/type/photo.js';

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

  @query('.meta-input')
    metaInput: HTMLInputElement | undefined;

  protected override firstUpdated(): void {
    this.photoForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm();
    });
  }

  protected async _submitForm(): Promise<void> {
    if (this.photoInput?.files == null) return;
    const file = this.photoInput.files[0];

    const meta = this.metaInput?.value;
    if (meta == null) return;

    try {
      await this._uploadPhoto(file, meta);
    }
    catch (err) {
      this._logger.error('_submitForm', 'upload_failed');
      return;
    }
  }

  protected async _uploadPhoto(
      file: File,
      description: string,
  ): Promise<AlwatrServiceResponseSuccessWithMeta<Photo, PhotoMeta>> {
    if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
      throw new Error('invalid_file_type');
    }

    const fileBlob = new Blob([file]);

    const response = await serviceRequest<Photo, PhotoMeta>({
      url: 'http://localhost:8000/',
      method: 'PUT',
      body: fileBlob,
      headers: {
        'Content-Type': file.type,
      },
      queryParameters: {
        'description': description,
      },
    });

    return response as AlwatrServiceResponseSuccessWithMeta<Photo, PhotoMeta>;
  }


  override render(): unknown {
    return html`
      <form class="photo-form">
        <input type="file" name="photo" class="photo-input" />
        <input type="text" name="meta" class="meta-input" />
        <input type="submit" />
      </form>
    `;
  }
}
