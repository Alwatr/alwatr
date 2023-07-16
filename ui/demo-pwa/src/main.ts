import {render} from '@alwatr/fract';

import './main.css';
import {appLogger} from './share/logger.js';
import {alwatrPwa, alwatrPwaContainer} from './ui/alwatr-pwa.js';

appLogger.logModule?.('main');

alwatrPwaContainer.replaceChildren(); // clean content
render(alwatrPwa(), alwatrPwaContainer);
alwatrPwaContainer.removeAttribute('unresolved');
