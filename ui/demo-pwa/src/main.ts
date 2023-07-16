import {render} from '@alwatr/fract';

import './main.css';
import {appLogger} from './share/logger.js';
import {alwatrPwa} from './ui/alwatr-pwa.js';
import {rootElement} from './ui/root-element.js';

appLogger.logModule?.('main');

rootElement.replaceChildren(); // clean content
render(alwatrPwa(), rootElement);
rootElement.removeAttribute('unresolved');
