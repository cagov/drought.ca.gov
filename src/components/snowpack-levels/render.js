// Example of this JSON: https://cdec.water.ca.gov/snowapp/services/statewide/swe
// See .github/workflows/fetch-drought-data.yml 
const conditions = require('./snowpackConditions.json');
const cheerio = require("cheerio");

// Get the latest entry from the data.
const [latestEntry] = conditions.swe
  .sort((a, b) => a.swcDate > b.swcDate)
  .slice(-1);

// Render live-data-based values into the component via 11ty transform.
const renderSnowpackLevels = function (html) {
  // Find all instances of the component on the page.
  const components = html.matchAll(
    /<drought-snowpack-levels\s*[^>]*?\s*>[\s\S]*?<\/drought-snowpack-levels>/gm
  );

  let result = html;

  // Loop through all instances of the component on the page.
  for (component of components) {
    let { 0: originalMarkup, index } = component;
    let $ = cheerio.load(originalMarkup, null, false);

    // If this placeholder is present within the provided mark-up, fill it with value.
    if ($("#current-percentage").length) {
      $("#current-percentage").text(`${latestEntry.pctApr1}%`);
    }

    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = { renderSnowpackLevels };