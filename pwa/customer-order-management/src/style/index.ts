import ionicNormalize from './ionic.normalize';
import ionicTheming from './ionic.theming';
import normalize from './normalize';

import type {CSSResult} from 'lit';

const styles: CSSResult[] = [normalize, ionicNormalize, ionicTheming];

export default styles;
