import DroughtDataVizBase from '../data-viz-base/index.js';
import css from './styles.css';
import html from './template.html';
import historicData from './data/historicMonthlyAvgs.json';

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

    const rows = this.querySelectorAll('tbody tr');
    const rowsData = [...rows].reduce((bucket, row) => {
      bucket.push({
        total: row.getAttribute('data-total'),
        year: row.getAttribute('data-year'),
        month: row.getAttribute('data-month'),
        label: row.querySelector('.month-label').textContent
      });
      return bucket;
    }, []);

    const sortedRowsData = rowsData.sort((a, b) => 
      a.year.localeCompare(b.year) || a.month - b.month
    );

    const graph = this.shadowRoot.querySelector('#precipitation-graph');
    const historicPoints = [];

    sortedRowsData.forEach((row, i) => {
      let bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      let y = Math.round(floorY - ((row.total / 1500) * rangeY));
      let height = Math.round((row.total / 1500) * rangeY);
      bar.setAttribute('x', startX + (i * barGapX));
      bar.setAttribute('y', y);
      bar.setAttribute('width', barWidth);
      bar.setAttribute('height', height);
      bar.classList.add('monthly-bar');
      graph.append(bar);

      let label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      let centerBarX = startX + (i * barGapX) + (barWidth / 2);
      label.setAttribute('x', centerBarX);
      label.setAttribute('y', labelY);
      label.setAttribute('dominant-baseline', 'hanging');
      label.setAttribute('text-anchor', 'middle');
      label.classList.add('x-label');
      label.textContent = row.label;
      graph.append(label);

      let historicMonth = historicData[row.month];
      historicPoints.push({
        x: centerBarX,
        y: Math.round(floorY - ((historicMonth / 1500) * rangeY))
      });
    });

    console.log(historicPoints)

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const [ first, ...rest ] = historicPoints;
    const pathD = rest.map((p) => `L${p.x},${p.y}`).join(' ');
    path.setAttribute('d', `M${first.x},${first.y} ${pathD}`);
    path.classList.add('historic');
    graph.append(path);
  }
}

window.customElements.define("drought-precipitation-levels", DroughtPrecipitationLevels);

export default DroughtPrecipitationLevels;