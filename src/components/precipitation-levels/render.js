const cheerio = require("cheerio");
const glob = require("glob");
const fs = require("fs");
const path = require("path");
const historicData = require('./data/historicMonthlyAvgs.json');

console.log(historicData)

// Example of this JSON: https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?SensorNums=2&dur_code=M&Start=2021-01-01&End=2021-12-31&Stations=APU,ASM,ATW,ABR,AUB,BFK,BFS,BRM,BGB,BBE,BGC,BGS,BIS,BYM,BLY,BCA,BDE,BOW,BDG,BCM,CCH,CVT,CAL,CPD,CPT,CDV,CVD,CHS,CES,CNL,CLN,CFF,CLF,CTT,COV,CEC,CRC,CUY,DVS,DSB,DTV,DMS,DWV,DYL,DNM,EGL,ELC,ERY,ELS,ENG,ERK,FRF,FMT,NIC,FDD,FLR,FLD,FRH,FBW,FJN,FRR,FRO,GAS,GLK,GRG,GNF,GLV,GRO,GSV,GVL,GHS,HWE,HND,HAP,HTH,HCK,HLS,HOO,HSS,IMP,IPN,ISB,JNL,KP3,KR3,OLS,LGT,ARR,LPA,SBN,LMC,LFH,LND,LDG,LCC,LAN,MDR,MRP,MKV,MLD,MFS,MNR,MCN,MDE,MTY,HML,MSC,WLS,MNH,NSH,NDL,NVD,EXC,NMQ,NLD,NFR,OSM,ORL,OXN,PCF,PMS,PNH,PSC,PNF,PCV,PLE,PRT,QNC,RBF,RGC,HEA,SCR,SGH,SAP,SDG,SFF,SLO,ANA,SBR,CRZ,SRO,SCA,SRR,SLP,SSG,SOR,SEY,SKR,SGV,SNH,STK,STG,STV,SCC,SSN,TAC,TRM,3RV,TCR,TKE,29P,UKH,VNT,VSL,WSC,WTW,WVR,WPT,WDL,YSV,YRK
// See .github/workflows/fetch-drought-data.yml 
const precipDataDir = "src/components/precipitation-levels/data";
const relevantDataYears = glob.sync(`${precipDataDir}/*_monthly.json`)
  .flatMap(filepath => parseInt(path.basename(filepath).match(/\d+/g)))
  .sort((a, b) => b - a)
  .slice(0,2);

const [ currentYear, previousYear ] = relevantDataYears;
const [ currentYearData, previousYearData ] = relevantDataYears.map(year => 
  JSON.parse(fs.readFileSync(`${precipDataDir}/${year}_monthly.json`, 'utf8')));

const latestDate = new Date(Math.max(...currentYearData.map(entry => new Date(entry.date))));

const graphMonths = [];
// .getMonth() is zero-indexed, so we don't need to subtract to get previous month.
let runningGraphMonth = latestDate.getMonth();
let runningGraphYear = currentYear;
let runningGraphData = currentYearData;
for (let i = 0; i < 7; i++) {
  // Switch to December when we move further back than January.
  if (runningGraphMonth < 1) {
    runningGraphMonth = 12;
    runningGraphYear = previousYear; 
    runningGraphData = previousYearData; 
  }

  let total = runningGraphData
    .filter(entry => 
      entry.date === `${runningGraphYear}-${runningGraphMonth}-1 00:00`
      && entry.value >= 0)
    .reduce((bucket, entry) => bucket + entry.value, 0)

  graphMonths.push({ 
    month: runningGraphMonth, 
    year: runningGraphYear, 
    total: total.toFixed(2),
    historic: historicData[runningGraphMonth.toString()] 
  });
  runningGraphMonth -= 1;
}

console.log(graphMonths);

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

    graphMonths.reverse().forEach((entry, index) => {
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

    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = renderPrecipitationLevels;