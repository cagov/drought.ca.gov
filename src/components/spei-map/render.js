// Example of this JSON: https://cww.water.ca.gov/?dataservice=speimap
// See .github/workflows/fetch-drought-data.yml 
const updated = require('./updated.json');
const cheerio = require("cheerio");

const updateDate = new Date(updated.created_date).toLocaleString("en-US", {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const dataDate = new Date(updated.data_date).toLocaleString("en-US", {
  year: 'numeric',
  month: 'long'
});

// Render live-data-based values into the component via 11ty transform.
const renderSpeiMapData = function (html) {
  let result = html;

  const updateDateSpans = html.matchAll(
    /<span class="spei-map-update-date">[\s\S]*?<\/span>/gm
  );

  const dataDateSpans = html.matchAll(
    /<span class="spei-map-data-date">[\s\S]*?<\/span>/gm
  );

  for (date in updateDateSpans) {
    let { 0: originalMarkup, index } = date;
    let $ = cheerio.load(originalMarkup, null, false);

    $(".spei-map-update-date").text(updateDate);

    result = result.replace(originalMarkup, $.html());
  }

  for (date in dataDateSpans) {
    let { 0: originalMarkup, index } = date;
    let $ = cheerio.load(originalMarkup, null, false);

    $(".spei-map-data-date").text(updateDate);

    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = renderSpeiMapData;