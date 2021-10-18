import '@cagov/ds-accordion';
// import '@cagov/ds-agency-footer'; // @ISSUE Which version is correct?
import '@cagov/ds-back-to-top/src/index.js';
// import '@cagov/ds-branding'; // @ISSUE Which version is correct?
// import '@cagov/ds-card-grid'; // @ISSUE Missing.
import '@cagov/ds-content-navigation';
import '@cagov/ds-dropdown-menu';
// import '@cagov/ds-feature-card'; // @ISSUE Missing.
import '@cagov/ds-feedback';
// import '@cagov/ds-google-translate'; // @ISSUE Missing?
import '@cagov/ds-minus';
import '@cagov/ds-pagination';
import '@cagov/ds-pdf-icon/src/index.js';
import '@cagov/ds-plus';
// import '@cagov/ds-regulatory-outline';
// import '@cagov/ds-skip-to-content';
import '@cagov/ds-statewide-header/src/index.js';
// import '@cagov/ds-statewide-foooter'; // @ISSUE Which version is correct?
// import '@cagov/ds-step-list'; // @ISSUE Missing?

// Development (?)
// import '../components/menu/index.js';
// import '../components/content-navigation/index.js';

// Local components
import '../components/post-list/index.js';
import '../components/page-alert/index.js';
import '../components/drought-map/index.js';

// Analytics
import setupAnalytics from './gatracker/index.js';

window.onload = (event) => {
    setupAnalytics();
};