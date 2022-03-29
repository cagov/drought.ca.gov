import DroughtDataVizBase from '../data-viz-base/index.js';
import css from './styles.css';
import html from './template.html';

class DroughtPrecipitationLevels extends DroughtDataVizBase {
  constructor() {
    super(html, css);
  }

  connectedCallback() {
    const minX = 40;
    const gutterX = 20;
    const startX = minX + gutterX;
    const barWidth = 20;
    const barGapX = 105;
    const peakY = 45;
    const floorY = 285;
    const labelY = 295;
    const rangeY = floorY - peakY;

    const table = this.querySelector('#precip-data-table');
    const monthHeader = table.querySelector('#precip-month-header').textContent;
    const totalHeader = table.querySelector('#precip-total-header').textContent;
    const historicHeader = table.querySelector('#precip-historic-header').textContent;

    const rows = table.querySelectorAll('tbody tr');
    const rowsData = [...rows].reduce((bucket, row) => {
      bucket.push({
        total: row.getAttribute('data-total'),
        year: row.getAttribute('data-year'),
        month: row.getAttribute('data-month'),
        historic: row.getAttribute('data-historic'),
        labelText: row.querySelector('.precip-month-label').textContent,
        totalText: row.querySelector('.precip-month-total').textContent,
        historicText: row.querySelector('.precip-month-historic').textContent
      });
      return bucket;
    }, []);

    const sortedRowsData = rowsData.sort((a, b) => 
      a.year.localeCompare(b.year) || a.month - b.month
    );

    const container = this.shadowRoot.querySelector('.popover-container');
    const graph = this.shadowRoot.querySelector('#precipitation-graph');
    const historicPoints = [];
    const elementSets = [];

    sortedRowsData.forEach((row, i) => {
      let bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      let barTopY = Math.round(floorY - ((row.total / 1500) * rangeY));
      let height = Math.round((row.total / 1500) * rangeY);
      bar.setAttribute('x', startX + (i * barGapX));
      bar.setAttribute('y', barTopY);
      bar.setAttribute('width', barWidth);
      bar.setAttribute('height', height);
      bar.classList.add('monthly-bar');

      let label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      let centerBarX = startX + (i * barGapX) + (barWidth / 2);
      label.setAttribute('x', centerBarX);
      label.setAttribute('y', labelY);
      label.setAttribute('dominant-baseline', 'hanging');
      label.setAttribute('text-anchor', 'middle');
      label.classList.add('x-label');
      label.textContent = row.labelText;

      let historicY = Math.round(floorY - ((row.historic / 1500) * rangeY));
      historicPoints.push({
        x: centerBarX,
        y: historicY
      });

      const historicCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      historicCircle.setAttribute('cx', centerBarX);
      historicCircle.setAttribute('cy', historicY);
      historicCircle.setAttribute('r', '4');
      historicCircle.classList.add('historic-point');

      const historicCircleHoverTarget = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      historicCircleHoverTarget.setAttribute('cx', centerBarX);
      historicCircleHoverTarget.setAttribute('cy', historicY);
      historicCircleHoverTarget.setAttribute('r', '12');
      historicCircleHoverTarget.classList.add('historic-point-hover');
      
      let currentPopOver = document.createElement('div');
      currentPopOver.setAttribute('tabindex', '0');
      currentPopOver.classList.add('popover-content');
      currentPopOver.style.setProperty('--x', `${centerBarX + 15}px`);
      currentPopOver.style.setProperty('--y', `${barTopY}px`);
      currentPopOver.innerHTML = `
        <div class="popover-legend">
          <svg width="13" height="13" viewBox="0 0 10 10" alt="">
            <rect x="0" y="0" width="10" height="10" />
          </svg>
          <p class="popover-header">${totalHeader}</p>
        </div>
        <p class="popover-stat">${row.totalText}</p>
      `;

      let historicPopOver = document.createElement('div');
      historicPopOver.setAttribute('tabindex', '0');
      historicPopOver.classList.add('popover-content');
      historicPopOver.style.setProperty('--x', `${centerBarX + 15}px`);
      historicPopOver.style.setProperty('--y', `${historicY}px`);
      historicPopOver.innerHTML = `
        <div class="popover-legend">
          <svg width="30" height="13" viewBox="0 0 30 13" alt="">
            <line x1="0" y1="7" x2="30" y2="7" class="historic" />
          </svg>
          <p class="popover-header">${historicHeader}</p>
        </div>
        <p class="popover-stat">${row.historicText}</p>
      `;

      elementSets.push({
        bar,
        label,
        historicCircle,
        historicCircleHoverTarget,
        currentPopOver,
        historicPopOver
      })
    });

    elementSets.forEach((set) => {
      graph.append(set.bar);
      graph.append(set.label);
    });

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const [ first, ...rest ] = historicPoints;
    const pathD = rest.map((p) => `L${p.x},${p.y}`).join(' ');
    path.setAttribute('d', `M${first.x},${first.y} ${pathD}`);
    path.classList.add('historic');
    graph.append(path);

    elementSets.forEach((set) => {
      graph.append(set.historicCircle);
      graph.append(set.historicCircleHoverTarget);
      container.append(set.historicPopOver);
      container.append(set.currentPopOver);
      this.setUpPopOvers(set.currentPopOver, set.bar);
      this.setUpPopOvers(set.historicPopOver, set.historicCircleHoverTarget);
    });
  }
}

window.customElements.define("drought-precipitation-levels", DroughtPrecipitationLevels);

export default DroughtPrecipitationLevels;