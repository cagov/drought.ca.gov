// Example of this JSON: https://cdec.water.ca.gov/resapp/service/res/conditions?date=2022-03-08&stationIds=SHA,ORO,BUL,FOL,CMN,CLE,WRS,SNL,CCH,CSI,CAS,DMV,NML,DNP,EXC,MIL,PNF
// See .github/workflows/fetch-drought-data.yml 
const conditions = require('./majorReservoirConditions.json');
const cheerio = require("cheerio");

// Sum up figures across all reservoirs.
const agregates = conditions.reduce((bucket, reservoir) => ({
  currentStorage: Math.round(bucket.currentStorage + reservoir.storage),
  historicalAverage: Math.round(bucket.historicalAverage + reservoir.avg),
  totalCapacity: Math.round(bucket.totalCapacity + reservoir.cap)
}), {
  currentStorage: 0,
  historicalAverage: 0,
  totalCapacity: 0
});

// Calculate TAF for each sum.
const currentTAF = Math.round(agregates.currentStorage / 1000);
const historicalTAF = Math.round(agregates.historicalAverage / 1000);
const capacityTAF = Math.round(agregates.totalCapacity / 1000);

// Figure out the current water level's percentage against historical average.
const currentPercentage = Math.round(100 * agregates.currentStorage / agregates.historicalAverage);

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
    const locale = $("drought-reservoir-levels").data('locale') || "en-US";

    const unit = $("drought-reservoir-levels").data('unit') || "thousands of acre feet (TAF)";

    // Set data values on the component.
    $("drought-reservoir-levels")
      .attr("data-current-taf", currentTAF)
      .attr("data-historical-taf", historicalTAF)
      .attr("data-capacity-taf", capacityTAF);

    $('#reservoir-data-table').append(`
      <tr id="reservoir-data">
        <td class="reservoir-capacity">${capacityTAF.toLocaleString(locale)} ${unit}</td>
        <td class="reservoir-historic">${historicalTAF.toLocaleString(locale)} ${unit}</td>
        <td class="reservoir-current">${currentTAF.toLocaleString(locale)} ${unit}</td>
      </tr>
    `);

    // If these placeholders are present within the provided mark-up, fill them with real values.
    if ($("#current-percentage").length) {
      $("#current-percentage").text(`${currentPercentage}%`);
    }

    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = renderReservoirLevels;