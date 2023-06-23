// TODO: rename me to index
import {html, render} from '@alwatr/fract';

import './app.scss';
import {appLogger} from '../share/logger.js';

appLogger.logModule?.('app');

const alwatrPwa = (): unknown => html`<div class="alwatr-pwa">Hi ;)</div>`;

render(alwatrPwa(), document.body);

document.body.classList.remove('loading');

// TODO: send app rendered signal
