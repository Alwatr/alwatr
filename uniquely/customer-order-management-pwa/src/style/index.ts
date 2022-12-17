import ionicNormalize from './ionic.normalize.js';
import ionicTheming from './ionic.theming.js';
import normalize from './normalize.js';

import type {CSSResult} from 'lit';

const styles: CSSResult[] = [normalize, ionicNormalize, ionicTheming];

export default styles;
