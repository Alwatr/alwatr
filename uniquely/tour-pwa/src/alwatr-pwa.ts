// TODO: rename me to index
import {render} from 'lit-html';

import './alwatr-pwa.css';
// import './ui/alwatr-pwa.js';
import {alwatrPwaDirective} from './ui/alwatr-pwa-directive.js';

const rootElement = document.getElementById('root');
if (rootElement == null) {
  throw new Error('Root element not found in the body');
}

render(alwatrPwaDirective(), rootElement);
