// JSON from https://cdec.water.ca.gov/resapp/service/res/conditions?date=2022-03-08&stationIds=SHA,ORO,BUL,FOL,CMN,CLE,WRS,SNL,CCH,CSI,CAS,DMV,NML,DNP,EXC,MIL,PNF
const conditions = require('./majorReservoirConditions.json');

const agregates = conditions.reduce((bucket, reservoir) => ({
  currentStorage: Math.round(bucket.currentStorage + reservoir.storage),
  historicalAverage: Math.round(bucket.historicalAverage + reservoir.avg),
  totalCapacity: Math.round(bucket.totalCapacity + reservoir.cap)
}), {
  currentStorage: 0,
  historicalAverage: 0,
  totalCapacity: 0
});

const currentStorageTAF = Math.round(agregates.currentStorage / 1000);
const historicalAverageTAF = Math.round(agregates.historicalAverage / 1000);
const totalCapacityTAF = Math.round(agregates.totalCapacity / 1000);

const currentPctOfHistorical = Math.round(100 * agregates.currentStorage / agregates.historicalAverage);
const currentPctOfCapacity = Math.round(100 * agregates.currentStorage / agregates.totalCapacity);
const historicalPctOfCapacity = Math.round(100 * agregates.historicalAverage / agregates.totalCapacity);

const svgBasinDepth = 135;
const historicalLineY = Math.round(svgBasinDepth - (svgBasinDepth * historicalPctOfCapacity / 100));
const currentWaterLevelY = Math.round(svgBasinDepth - (svgBasinDepth * currentPctOfCapacity / 100));
const currentWaterHeight = Math.round(svgBasinDepth * currentPctOfCapacity / 100);

module.exports = {
  ...agregates,
  currentStorageTAF,
  historicalAverageTAF,
  totalCapacityTAF,
  currentPctOfHistorical,
  currentPctOfCapacity,
  historicalPctOfCapacity,
  shapes: {
    historicalLineY,
    currentWaterLevelY,
    currentWaterHeight
  }
};