const cheerio = require("cheerio");
const glob = require("glob");
const fs = require("fs");
const path = require("path");
const historicData = require('./data/historicMonthlyAvgs.json');

// Example of this JSON: https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?SensorNums=2&dur_code=M&Start=2021-01-01&End=2021-12-31&Stations=APU,ASM,ATW,ABR,AUB,BFK,BFS,BRM,BGB,BBE,BGC,BGS,BIS,BYM,BLY,BCA,BDE,BOW,BDG,BCM,CCH,CVT,CAL,CPD,CPT,CDV,CVD,CHS,CES,CNL,CLN,CFF,CLF,CTT,COV,CEC,CRC,CUY,DVS,DSB,DTV,DMS,DWV,DYL,DNM,EGL,ELC,ERY,ELS,ENG,ERK,FRF,FMT,NIC,FDD,FLR,FLD,FRH,FBW,FJN,FRR,FRO,GAS,GLK,GRG,GNF,GLV,GRO,GSV,GVL,GHS,HWE,HND,HAP,HTH,HCK,HLS,HOO,HSS,IMP,IPN,ISB,JNL,KP3,KR3,OLS,LGT,ARR,LPA,SBN,LMC,LFH,LND,LDG,LCC,LAN,MDR,MRP,MKV,MLD,MFS,MNR,MCN,MDE,MTY,HML,MSC,WLS,MNH,NSH,NDL,NVD,EXC,NMQ,NLD,NFR,OSM,ORL,OXN,PCF,PMS,PNH,PSC,PNF,PCV,PLE,PRT,QNC,RBF,RGC,HEA,SCR,SGH,SAP,SDG,SFF,SLO,ANA,SBR,CRZ,SRO,SCA,SRR,SLP,SSG,SOR,SEY,SKR,SGV,SNH,STK,STG,STV,SCC,SSN,TAC,TRM,3RV,TCR,TKE,29P,UKH,VNT,VSL,WSC,WTW,WVR,WPT,WDL,YSV,YRK
// See .github/workflows/fetch-drought-data.yml 
// Get the two most recent years for which we have data.
const precipDataDir = "src/components/precipitation-levels/data";
const relevantDataYears = glob.sync(`${precipDataDir}/*_monthly.json`)
  .flatMap(filepath => parseInt(path.basename(filepath).match(/\d+/g)))
  .sort((a, b) => b - a)
  .slice(0,2);

// Load and combine the corresponding JSON files for the last two years.
const yearData = relevantDataYears.flatMap(year => 
  JSON.parse(fs.readFileSync(`${precipDataDir}/${year}_monthly.json`, 'utf8')));

// Collect and summarize stats across all sensors for each month.
const statsByMonth = yearData.reduce((bucket, entry) => {
  // If the reduction bucket does not contain this month yet, add it.
  if (!(entry.date in bucket)) {
    const date = new Date(entry.date);
    // getMonth() is zero-indexed, so we need to add 1 to get the real month.
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const historic = historicData[month];

    bucket[entry.date] = {
      total: 0,
      historic,
      totalSensors: 0,
      missingSensors: 0,
      month,
      year,
      originalDateStr: entry.date
    };
  }
  
  // Add this sensor's info to the month's sums.
  const monthCollection = bucket[entry.date];
  const totalSensors = monthCollection.totalSensors + 1;
  const missingSensors = (entry.value === -9999)
    ? monthCollection.missingSensors + 1
    : monthCollection.missingSensors;
  const total = (entry.value >= 0)
    ? +(+monthCollection.total + entry.value).toFixed(2)
    : monthCollection.total;

  // Update this month's totals in the reduction bucket.
  const revisedCollection = Object.assign(monthCollection, {
    total,
    totalSensors,
    missingSensors
  });
  bucket[entry.date] = revisedCollection;

  return bucket;
}, {});

// Process the summarized stats into something we can use.
const stats = Object.keys(statsByMonth)
  // First, convert statsByMonth from an object to an array.
  .map(dateStr => statsByMonth[dateStr])
  // Next, filter out any months for which we don't have half the sensor readings yet.
  .filter(month => (month.missingSensors / month.totalSensors) < .5)
  // Sort by year and month, recent at the top.
  .sort((a, b) => b.year - a.year || b.month - a.month)
  // Take the most recent seven months off the top.
  .slice(0, 7);

// console.log(stats)

// Render live-data-based values into the component via 11ty transform.
const renderPrecipitationLevels = function (html) {
  // Find all instances of the component on the page.
  const components = html.matchAll(
    /<drought-precipitation-levels\s*[^>]*?\s*>[\s\S]*?<\/drought-precipitation-levels>/gm
  );

  let result = html;

  // Loop through all instances of the component on the page.
  for (component of components) {
    let { 0: originalMarkup, index } = component;
    let $ = cheerio.load(originalMarkup, null, false);

    // Get the locale for translating number display, if needed. Commas, decimals, etc.
    const locale = $("drought-precipitation-levels").data('locale') || "en-US";

    // Get the data-unit attribute if available, set default if not.
    const unit = $("drought-precipitation-levels").data('unit') || "inches";
    $("drought-precipitation-levels").attr("data-unit", unit);

    // Process each month, add a corresponding row to the table.
    stats.reverse().forEach((entry, index) => {
      const dateObj = new Date(`${entry.year}-${entry.month}-02`);
      const monthStringOptions = (entry.month === 12 || entry.month === 1)
        ? { month: "short", year: "numeric" }
        : { month: "short" };
      const monthString = dateObj.toLocaleString(locale, monthStringOptions);

      $('#precip-data-table').append(`
        <tr id="precip-month-${entry.month}" 
          data-month="${entry.month}" 
          data-year="${entry.year}" 
          data-total="${entry.total}"
          data-historic="${entry.historic}">
          <td class="precip-month-label">${monthString}</td>
          <td class="precip-month-total">${entry.total} ${unit}</td>
          <td class="precip-month-historic">${entry.historic} ${unit}</td>
        </tr>
      `);
    });

    // Write out the modified HTML.
    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = renderPrecipitationLevels;