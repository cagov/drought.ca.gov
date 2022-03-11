// Example of this JSON: https://cdec.water.ca.gov/resapp/service/res/conditions?date=2022-03-08&stationIds=SHA,ORO,BUL,FOL,CMN,CLE,WRS,SNL,CCH,CSI,CAS,DMV,NML,DNP,EXC,MIL,PNF
// See .github/workflows/fetch-drought-data.yml 
const conditions = require('./majorReservoirConditions.json');
const cheerio = require("cheerio");

const agregates = conditions.reduce((bucket, reservoir) => ({
  currentStorage: Math.round(bucket.currentStorage + reservoir.storage),
  historicalAverage: Math.round(bucket.historicalAverage + reservoir.avg),
  totalCapacity: Math.round(bucket.totalCapacity + reservoir.cap)
}), {
  currentStorage: 0,
  historicalAverage: 0,
  totalCapacity: 0
});

const currentTAF = Math.round(agregates.currentStorage / 1000);
const historicalTAF = Math.round(agregates.historicalAverage / 1000);
const capacityTAF = Math.round(agregates.totalCapacity / 1000);
const currentPercentage = Math.round(100 * agregates.currentStorage / agregates.historicalAverage);

const renderReservoirLevels = function (html) {
  const components = html.matchAll(
    /<cagov-reservoir-levels\s*[^>]*?\s*>[\s\S]*?<\/cagov-reservoir-levels>/gm
  );

  let result = html;

  for (component of components) {
    let { 0: originalMarkup, index } = component;
    let $ = cheerio.load(originalMarkup, null, false);

    const locale = $("cagov-reservoir-levels").data('locale') || "en-US";

    $("cagov-reservoir-levels")
      .attr("data-current-taf", currentTAF)
      .attr("data-historical-taf", historicalTAF)
      .attr("data-capacity-taf", capacityTAF)
    $("#current-taf").text(currentTAF.toLocaleString(locale));
    $("#historical-taf").text(historicalTAF.toLocaleString(locale));
    $("#capacity-taf").text(capacityTAF.toLocaleString(locale));
    $("#current-percentage").text(`${currentPercentage}%`);

    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = { renderReservoirLevels };