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

    // peakX/peakY are the X/Y values on the graph for the historic peak. 
    const peakY = 20;
    const peakX = 182; // X value for April 1st.

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

    // We'll use this unixDay value to compare dates.
    const unixDay = 1000 * 60 * 60 * 24;

    // An array of SVG x/y line coordinates, representing historic average snowpack.
    const avgPathD = data.avg.reduce((bucket, entry, index) => {
      // Just remove the leap year day.
      if (entry.month === 2 && entry.day === 29) {
        return bucket;
      }

      const x = index;
      const y = Math.round(peakY + (rangeY - (rangeY * entry.avg)));
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
      const y = Math.round(peakY + (rangeY - (rangeY * (entry.pctApr1 / 100))));

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
    
      text.innerHTML = new Date(`${year}-${month}-02`).toLocaleDateString(locale, dateOptions);
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

    const currentLegendText = this.querySelector('#snowpack-current-header').innerHTML;
    const currentContent = this.querySelector('.snowpack-current').innerHTML;
    const currentPopOver = this.buildPopOverElement({
      container,
      x: `${((currentCircleX + 15) / fullWidth) * 100}%`,
      y: `${((currentCircleY) / fullHeight) * 100}%`,
      content: currentContent,
      legendText: currentLegendText,
      legendSvg: `
        <svg width="26" height="13" viewBox="0 0 26 13" aria-hidden="true">
          <line x1="0" y1="7" x2="26" y2="7" stroke-linecap="round" class="current" />
        </svg>
      `
    });
    this.setUpPopOvers(currentPopOver, currentCircleHoverTarget);

    // Add the "historic peak" text next to the above circle.
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', (peakX - 12));
    text.setAttribute('y', peakY);
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'end');
    text.innerHTML = 'Historic peak';
    graph.append(text);

    // Add a circle at the historic peak.
    const peakCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    peakCircle.setAttribute('cx', peakX);
    peakCircle.setAttribute('cy', peakY);
    peakCircle.setAttribute('r', '4');
    peakCircle.classList.add('peak');
    graph.append(peakCircle);

    // Add a larger hover target for triggering the historic peak's pop-over content.
    const peakCircleHoverTarget = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    peakCircleHoverTarget.setAttribute('cx', peakX);
    peakCircleHoverTarget.setAttribute('cy', peakY);
    peakCircleHoverTarget.setAttribute('r', '12');
    peakCircleHoverTarget.setAttribute('id', 'historic-peak-hover-target');
    graph.append(peakCircleHoverTarget);

    // Build the pop-over for historic peak.
    const historicLegendText = this.querySelector('#snowpack-historic-header').innerHTML;
    const historicContent = this.querySelector('.snowpack-historic').innerHTML;
    const historicPeakPopOver = this.buildPopOverElement({
      container,
      x: `${((peakX + 15) / fullWidth) * 100}%`,
      y: `${(peakY / fullHeight) * 100}%`,
      content: historicContent,
      legendText: historicLegendText,
      legendSvg: `
        <svg width="13" height="13" viewBox="0 0 10 10" aria-hidden="true">
          <circle r="4" cx="5" cy="5" class="peak" />
        </svg>
      `
    });
    this.setUpPopOvers(historicPeakPopOver, peakCircleHoverTarget);
  }
}

window.customElements.define("drought-snowpack-levels", DroughtSnowpackLevels);

export default DroughtSnowpackLevels;