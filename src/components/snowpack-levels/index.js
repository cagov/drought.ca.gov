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

    // peakX/peakY are the X/Y values on the graph for the historic peak. 
    const peakY = 20;
    const peakX = 182; // X value for April 1st.


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
    const currentPopOver = this.shadowRoot.querySelector('#snowpack-current-swe');
    currentPopOver.style.setProperty('--x', `${currentCircleX + 15}px`);
    currentPopOver.style.setProperty('--y', `${currentCircleY}px`);
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

    const historicPeakPopOver = this.shadowRoot.querySelector('#snowpack-historical-peak-swe');
    historicPeakPopOver.style.setProperty('--x', `${peakX + 15}px`);
    historicPeakPopOver.style.setProperty('--y', `${peakY}px`);
    this.setUpPopOvers(historicPeakPopOver, peakCircleHoverTarget);
  }
}

window.customElements.define("drought-snowpack-levels", DroughtSnowpackLevels);

export default DroughtSnowpackLevels;