import {initialize} from '@ionic/core/components';
import {defineCustomElement as app} from '@ionic/core/components/ion-app.js';
import {defineCustomElement as button} from '@ionic/core/components/ion-button.js';
import {defineCustomElement as cardContent} from '@ionic/core/components/ion-card-content.js';
import {defineCustomElement as cardHeader} from '@ionic/core/components/ion-card-header.js';
import {defineCustomElement as cardTitle} from '@ionic/core/components/ion-card-title.js';
import {defineCustomElement as card} from '@ionic/core/components/ion-card.js';
import {defineCustomElement as content} from '@ionic/core/components/ion-content.js';
import {defineCustomElement as header} from '@ionic/core/components/ion-header.js';
import {defineCustomElement as input} from '@ionic/core/components/ion-input.js';
import {defineCustomElement as item} from '@ionic/core/components/ion-item.js';
import {defineCustomElement as label} from '@ionic/core/components/ion-label.js';
import {defineCustomElement as selectOption} from '@ionic/core/components/ion-select-option.js';
import {defineCustomElement as select} from '@ionic/core/components/ion-select.js';
import {defineCustomElement as spinner} from '@ionic/core/components/ion-spinner.js';
import {defineCustomElement as title} from '@ionic/core/components/ion-title.js';
import {defineCustomElement as toolbar} from '@ionic/core/components/ion-toolbar.js';

initialize({
  mode: 'md',
  animated: true,
});

app();
content();
header();
toolbar();
title();
card();
cardContent();
input();
item();
label();
cardHeader();
cardTitle();
select();
selectOption();
button();
spinner();
