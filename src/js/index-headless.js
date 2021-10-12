// Main build file for the JavaScript static site generation bundle.

// * @cagov/design-system *
// @DOCS [Link](@TODO)
// [Cookbook]
// [Boilerplate]
import "@cagov/ds-accordion";
import "@cagov/ds-feedback";
import "@cagov/ds-minus";
import "@cagov/ds-pagination";
import "@cagov/ds-plus";
import "@cagov/ds-google-translate";
import "@cagov/ds-dropdown-menu";
import "@cagov/ds-content-navigation";
import "@cagov/ds-pdf-icon/src/index.js";
import "@cagov/ds-back-to-top/src/index.js";

/* Project components */
// Patterns (more complex interfaces)
import "../components/post-list/index.js";
import "../components/event-list/index.js";
/* Components (individual components) */
import "../components/page-alert/index.js";

/* Custom components*/
import "../components/drought-map/index.js";

// *Insights*
// @DOCS @TODO Reference to anchor tag in BUILD.md
// Configurations in `config.json`; @TODO @ISSUE
//  import './headless/google-analytics.js'; ^v
// @TODO which version of analytics is correct?

//  import setupAnalytics from './headless/setup-analytics.js';
//  window.onload = (event) => {
//    setupAnalytics();
//  };

import setupAnalytics from "./gatracker/index.js";
window.onload = (event) => {
  setupAnalytics();
};
