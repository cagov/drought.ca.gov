import DroughtDataVizBase from '../data-viz-base/index.js';
import css from './styles.css';
import html from './template.html';
import data from './snowpackConditions.json';

class DroughtSnowpackLevels extends DroughtDataVizBase {
  constructor() {
    super(html, css);
  }

  connectedCallback() {
    const graph = this.shadowRoot.querySelector('#snowpack-graph');
    const container = this.shadowRoot.querySelector('.popover-container');
    const locale = this.dataset.locale || 'en-US';
    const historicPeakLabel = this.dataset.historicPeakLabel || 'Historic peak';

    // peakY is the maximum Y value on the SVG graph.
    // This helps maintain a margin at the top of the graph.
    const peakY = 20;

    // width/height of the SVG viewbox.
    const fullWidth = 365;
    const fullHeight = 175;

    // floorY is the Y value for the graph's baseline. Like y = 0 for our math.
    const floorY = 145;

    // rangeY is the total number of Y points between floor and peak.
    const rangeY = floorY - peakY;

    // We need to get the start date of the graph.
    // Start of the snowpack year is October 1st.
    const sweByDate = data.swe.sort((a, b) => a.swcDate > b.swcDate);
    const firstSwe = sweByDate[0];
    const graphStartYear = firstSwe
      ? new Date(firstSwe.swcDate).getFullYear() 
      : new Date().getFullYear(); 
    const graphStartDate = new Date(`${graphStartYear}-10-01`);

    // We need to see if any part of the snowpack is above historic peak.
    // If so, we'll need to resize Y points to squeeze everything into the graph.
    const highestCurrentSwe = Math.max(...data.swe.map(s => s.pctApr1 || 0));
    const yPointMultiplier = (highestCurrentSwe > 100) 
      ? (100 - (highestCurrentSwe - 100)) / 100
      : 1;

    // We'll use this unixDay value to compare dates.
    const unixDay = 1000 * 60 * 60 * 24;

    // An array of SVG x/y line coordinates, representing historic average snowpack.
    const avgPathD = data.avg.reduce((bucket, entry, index) => {
      // Just remove the leap year day.
      if (entry.month === 2 && entry.day === 29) {
        return bucket;
      }

      const x = index;
      const y = Math.round(peakY + (rangeY - (rangeY * entry.avg * yPointMultiplier)));
      bucket.push(`L${x},${y}`);

      return bucket;
    }, []);

    // An array of SVG x/y line coordinates, representing current snowpack levels.
    const currentPathCoordinates = data.swe.reduce((bucket, entry, index) => {
      // Parse the date.
      const date = new Date(entry.swcDate);

      // Just remove the leap year day.
      if (date.getMonth() === 2 && date.getDate() === 29) {
        return bucket;
      }

      // Diff this entry's date against the start date of the snowpack year.
      const snowpackYearDateDiff = (date - graphStartDate) + ((graphStartDate.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000)

      // Figure out the day of the snowpack year for this entry. This is x on the graph.
      const x = Math.floor(snowpackYearDateDiff / unixDay);
      // Get the y value based on percentage against historic peak.
      const y = Math.round(peakY + (rangeY - (rangeY * (entry.pctApr1 / 100) * yPointMultiplier)));

      // Plot this entry.
      bucket.push([x,y]);

      return bucket;
    }, []);

    // Get the starting year for this dataset.
    const startYear = (data.swe.length)
      ? new Date(Math.min(...data.swe.map(entry => new Date(entry.swcDate)))).getFullYear()
      : new Date().getFullYear();

    // Write out the translated labels for each month.
    [11, 1, 3, 5, 7, 9].forEach((month, i) => {
      let text = this.shadowRoot.querySelector(`#snowpack-month-${month}`);
      let year = month === 11 ? startYear : startYear + 1;
      let dateOptions = i < 2
        ? { month: 'short', year: '2-digit' }
        : { month: 'short' }

      let monthText = String(month).padStart(2, '0');
      let dateText = new Date(`${year}-${monthText}-02`).toLocaleDateString(locale, dateOptions);

      text.innerHTML = dateText;
    });

    // Plot the area of historic levels.
    const avgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    avgPath.setAttribute('d', `M0,${floorY} ${avgPathD.join(' ')} z`);
    avgPath.classList.add('avg');
    graph.append(avgPath);

    // Plot a line for current levels.
    const currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const currentPathD = currentPathCoordinates.map(([x,y]) => `L${x},${y}`).join(' ');
    currentPath.setAttribute('d', `M0,${floorY} ${currentPathD}`);
    currentPath.classList.add('current');
    graph.append(currentPath);

    // Plot a point at the end of the current level line.
    const currentCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const [[currentCircleX, currentCircleY]] = currentPathCoordinates.slice(-1);
    currentCircle.setAttribute('cx', currentCircleX);
    currentCircle.setAttribute('cy', currentCircleY);
    currentCircle.setAttribute('r', '4');
    currentCircle.classList.add('current-terminus')
    graph.append(currentCircle);

    // Add a larger hover target for triggering the current level's pop-over content.
    const currentCircleHoverTarget = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    currentCircleHoverTarget.setAttribute('cx', currentCircleX);
    currentCircleHoverTarget.setAttribute('cy', currentCircleY);
    currentCircleHoverTarget.setAttribute('r', '12');
    currentCircleHoverTarget.setAttribute('id', 'current-terminus-hover-target');
    graph.append(currentCircleHoverTarget);

    // Get the pop-over content for the current level.
    const currentPopOver = this.shadowRoot.querySelector('#current-popover');
    const currentPopOverX = ((currentCircleX + 15) / fullWidth) * 100;
    const currentPopOverY = ((currentCircleY) / fullHeight) * 100;
    currentPopOver.setAttribute('style', `--x:${currentPopOverX}%; --y:${currentPopOverY}%; --x-offset-m:0%;`);
    this.setUpPopOvers(currentPopOver, currentCircleHoverTarget);

    // Calculate the X/Y point for the historic peak.
    const historicPeakX = 182; // X point for April 1st.
    const historicPeakY = Math.round(peakY + (rangeY - (rangeY * yPointMultiplier)));

    // Add the "historic peak" text next to the above circle.
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', (historicPeakX - 12));
    text.setAttribute('y', historicPeakY);
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'end');
    text.innerHTML = historicPeakLabel;
    graph.append(text);

    // Add a circle at the historic peak.
    const peakCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    peakCircle.setAttribute('cx', historicPeakX);
    peakCircle.setAttribute('cy', historicPeakY);
    peakCircle.setAttribute('r', '4');
    peakCircle.classList.add('peak');
    graph.append(peakCircle);

    // Add a larger hover target for triggering the historic peak's pop-over content.
    const peakCircleHoverTarget = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    peakCircleHoverTarget.setAttribute('cx', historicPeakX);
    peakCircleHoverTarget.setAttribute('cy', historicPeakY);
    peakCircleHoverTarget.setAttribute('r', '12');
    peakCircleHoverTarget.setAttribute('id', 'historic-peak-hover-target');
    graph.append(peakCircleHoverTarget);

    // Get the pop-over content for the historic peak.
    const historicPeakPopOver = this.shadowRoot.querySelector('#historic-peak-popover');
    const historicPeakPopOverX = ((historicPeakX + 15) / fullWidth) * 100;
    const historicPeakPopOverY = (historicPeakY / fullHeight) * 100;
    historicPeakPopOver.setAttribute('style', `--x:${historicPeakPopOverX}%; --y:${historicPeakPopOverY}%; --x-offset-m:0%;`);
    this.setUpPopOvers(historicPeakPopOver, peakCircleHoverTarget);
  }
}

window.customElements.define("drought-snowpack-levels", DroughtSnowpackLevels);

export default DroughtSnowpackLevels;