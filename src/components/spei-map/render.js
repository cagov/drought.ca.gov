// Example of this JSON: https://cww.water.ca.gov/?dataservice=speimap
// See .github/workflows/fetch-drought-data.yml 
const updated = require('./updated.json');
const cheerio = require("cheerio");

// Render live-data-based values into the component via 11ty transform.
const renderSpeiMapData = function (html) {
  let result = html;
  let $ = cheerio.load(result, null, false);

  const locale = $("drought-spei-map").data("locale") || "en-US";

  const updateDate = new Date(updated.created_date).toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dataDate = new Date(updated.data_date).toLocaleString(locale, {
    year: 'numeric',
    month: 'long'
  });

  if ($(".spei-map-update-date").length || $(".spei-map-data-date").length) {
    if ($(".spei-map-update-date").length) {
      $(".spei-map-update-date").text(updateDate);
    }
    if ($(".spei-map-data-date").length) {
      $(".spei-map-data-date").text(dataDate);
    }

    return $.html();
  } 

  return result;
};

module.exports = renderSpeiMapData;