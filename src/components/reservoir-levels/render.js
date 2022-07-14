// Example of this JSON: https://cdec.water.ca.gov/resapp/service/res/conditions?date=2022-03-08&stationIds=SHA,ORO,BUL,FOL,CMN,CLE,WRS,SNL,CCH,CSI,CAS,DMV,NML,DNP,EXC,MIL,PNF
// See .github/workflows/fetch-drought-data.yml
const conditions = require("./majorReservoirConditions.json");
const cheerio = require("cheerio");

// Sum up figures across all reservoirs.
const agregates = conditions.reduce(
  (bucket, reservoir) => {
    if (
      ("storage" in reservoir) &&
      ("cap" in reservoir) &&
      ("avg" in reservoir)
    ) {
      return {
        currentStorage: Math.round(bucket.currentStorage + reservoir.storage),
        historicalAverage: Math.round(bucket.historicalAverage + reservoir.avg),
        totalCapacity: Math.round(bucket.totalCapacity + reservoir.cap),
      };
    } else {
      return bucket;
    }
  },
  {
    currentStorage: 0,
    historicalAverage: 0,
    totalCapacity: 0,
  }
);

// Calculate MAF for each sum.
const current = (agregates.currentStorage / 1000000).toFixed(2);
const historical = (agregates.historicalAverage / 1000000).toFixed(2);
const capacity = (agregates.totalCapacity / 1000000).toFixed(2);

// Figure out the current water level's percentage against historical average.
const currentPercentage = Math.round(
  (100 * agregates.currentStorage) / agregates.historicalAverage
);

// Render live-data-based values into the component via 11ty transform.
const renderReservoirLevels = function (html) {
  // Find all instances of the component on the page.
  const components = html.matchAll(
    /<drought-reservoir-levels\s*[^>]*?\s*>[\s\S]*?<\/drought-reservoir-levels>/gm
  );

  let result = html;

  // Loop through all instances of the component on the page.
  for (component of components) {
    let { 0: originalMarkup, index } = component;
    let $ = cheerio.load(originalMarkup, null, false);

    // Get the locale for translating number display, if needed. Commas, decimals, etc.
    const locale = $("drought-reservoir-levels").data("locale") || "en-US";

    const unit = $("drought-reservoir-levels").data("unit") || "millions of acre feet (MAF)";

    // Set data values on the component.
    $("drought-reservoir-levels")
      .attr("data-current", current)
      .attr("data-historical", historical)
      .attr("data-capacity", capacity);

    // If these placeholders are present within the provided mark-up, fill them with real values.
    if ($(".data-viz-pct").length) {
      $(".data-viz-pct").text(`${currentPercentage}%`);
    }
    if ($("[slot=capacity-stat]").length) {
      $("[slot=capacity-stat]").text(`${capacity.toLocaleString(locale)} ${unit}`);
    }
    if ($("[slot=historical-stat]").length) {
      $("[slot=historical-stat]").text(`${historical.toLocaleString(locale)} ${unit}`);
    }
    if ($("[slot=current-stat]").length) {
      $("[slot=current-stat]").text(`${current.toLocaleString(locale)} ${unit}`);
    }

    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = renderReservoirLevels;
