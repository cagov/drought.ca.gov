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
    const fullWidth = 730;
    const fullHeight = 340;
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

    const locale = this.dataset.locale || 'en-US';
    const unit = this.dataset.unit || 'inches';

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

    const unitLabel = this.shadowRoot.querySelector('#precipitation-unit');
    unitLabel.innerHTML = unit;

    const legendText = this.dataset.historicLegend || 'Historic Average';
    const description = this.shadowRoot.querySelector('.description');
    const legend = document.createElement('div');
    legend.classList.add('popover-legend');
    legend.innerHTML = `
      <svg width="60" height="13" viewBox="0 0 60 13" aria-hidden="true">
        <line x1="0" y1="7" x2="60" y2="7" class="historic" />
      </svg>
      <p class="popover-header">${legendText}</p>
    `
    description.append(legend);

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

      let currentPopOver = this.buildPopOverElement({
        container,
        x: `${((centerBarX + 15) / fullWidth) * 100}%`,
        y: `${(barTopY / fullHeight) * 100}%`,
        content: row.totalText,
        legendText: totalHeader,
        legendSvg: `
          <svg width="13" height="13" viewBox="0 0 10 10" aria-hidden="true">
            <rect x="0" y="0" width="10" height="10" />
          </svg>
        `
      });

      let historicPopOver = this.buildPopOverElement({
        container,
        x: `${((centerBarX + 15) / fullWidth) * 100}%`,
        y: `${(historicY / fullHeight) * 100}%`,
        content: row.historicText,
        legendText: historicHeader,
        legendSvg: `
          <svg width="30" height="13" viewBox="0 0 30 13" aria-hidden="true">
            <line x1="0" y1="7" x2="30" y2="7" class="historic" />
          </svg>
        `
      });

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
      this.setUpPopOvers(set.currentPopOver, set.bar);
      this.setUpPopOvers(set.currentPopOver, set.label);
      this.setUpPopOvers(set.historicPopOver, set.historicCircleHoverTarget);
    });
  }
}

window.customElements.define("drought-precipitation-levels", DroughtPrecipitationLevels);

export default DroughtPrecipitationLevels;