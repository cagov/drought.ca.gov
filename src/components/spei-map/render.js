// Example of this JSON: https://cww.water.ca.gov/?dataservice=speimap
// See .github/workflows/fetch-drought-data.yml 
const updated = require('./updated.json');
const cheerio = require("cheerio");

// Render live-data-based values into the component via 11ty transform.
const renderSpeiMapData = function (html) {
  let result = html;
  let $ = cheerio.load(result, null, false);

  const updateDate = $(".spei-map-update-date");

  if ($(".spei-map-update-date").length || $(".spei-map-data-date").length) {
    if ($(".spei-map-update-date").length) {
      $(".spei-map-update-date").text(updated.created_date);
    }
    if ($(".spei-map-data-date").length) {
      $(".spei-map-data-date").text(updated.data_date);
    }

    return $.html();
  } 

  return result;
};

module.exports = renderSpeiMapData;