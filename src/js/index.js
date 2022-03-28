import '@cagov/ds-accordion';
import '@cagov/ds-feedback';
import '@cagov/ds-minus';
import '@cagov/ds-pagination';
import '@cagov/ds-plus';
import '@cagov/ds-dropdown-menu';
import '@cagov/ds-content-navigation';
import '@cagov/ds-link-icon/src/index.js';
import '@cagov/ds-back-to-top/dist/index.js';

import '../components/post-list/index.js';
import '../components/page-alert/index.js';
import '../components/drought-map/index.js';
import '../components/reservoir-levels/index.js';
import '../components/snowpack-levels/index.js';
import '../components/precipitation-levels/index.js';

import setupAnalytics from './gatracker/index.js';

window.onload = (event) => {
    setupAnalytics();
};