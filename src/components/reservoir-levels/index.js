import DroughtDataVizBase from '../data-viz-base/index.js';
import css from './styles.css';
import html from './template.html';

class DroughtReservoirLevels extends DroughtDataVizBase {
  constructor() {
    super(html, css);
  }

  connectedCallback() {
    const currentTaf = parseInt(this.dataset.currentTaf);
    const historicalTaf = parseInt(this.dataset.historicalTaf);
    const capacityTaf = parseInt(this.dataset.capacityTaf);

    const currentPctOfCapacity = Math.round(100 * currentTaf / capacityTaf);
    const historicalPctOfCapacity = Math.round(100 * historicalTaf / capacityTaf);

    const svgBasinDepth = 135;
    const historicalLineY = Math.round(svgBasinDepth - (svgBasinDepth * historicalPctOfCapacity / 100));
    const historicalLinePadY = historicalLineY - 5;
    const waterLevelY = Math.round(svgBasinDepth - (svgBasinDepth * currentPctOfCapacity / 100));
    const waterHeight = Math.round(svgBasinDepth * currentPctOfCapacity / 100);

    const container = this.shadowRoot.querySelector('.popover-container');
    const fullWidth = 150;
    const fullHeight = 150;

    const waterLegendText = this.querySelector('#current-taf-heading').innerHTML;
    const waterContent = this.querySelector('.reservoir-current').innerHTML;
    const waterPopOver = this.buildPopOverElement({
      container,
      x: `${((fullWidth - 28) / fullWidth) * 100}%`,
      y: `70%`,
      xOffsetM: '65%',
      content: waterContent,
      legendText: waterLegendText,
      legendSvg: `
        <svg width="13" height="13" viewBox="0 0 10 10" aria-hidden="true">
          <rect x="0" y="0" width="10" height="10" class="filled" />
        </svg>
      `
    });
    const water = this.shadowRoot.querySelector('#basin-water');
    water.setAttribute('y', waterLevelY);
    water.setAttribute('height', waterHeight);
    this.setUpPopOvers(waterPopOver, water);

    const historicalLegendText = this.querySelector('#historical-taf-heading').innerHTML;
    const historicalContent = this.querySelector('.reservoir-historic').innerHTML;
    const historicalPopOver = this.buildPopOverElement({
      container,
      x: `${((fullWidth - 8) / fullWidth) * 100}%`,
      y: `23%`,
      xOffsetM: '65%',
      content: historicalContent,
      legendText: historicalLegendText,
      legendSvg: `
        <svg width="26" height="13" viewBox="0 0 26 13" aria-hidden="true">
          <line x1="0" y1="7" x2="26" y2="7" stroke-width="2" stroke-dasharray="2 4" stroke-linecap="round" class="historical" />
        </svg>
      `
    });
    const historicalLine = this.shadowRoot.querySelector('#historical-line');
    const historicalHoverTarget = this.shadowRoot.querySelector('#historical-line-hover-target');
    historicalLine.setAttribute('y1', historicalLineY);
    historicalLine.setAttribute('y2', historicalLineY);
    historicalHoverTarget.setAttribute('y', historicalLinePadY);
    this.setUpPopOvers(historicalPopOver, historicalHoverTarget);

    const basinLegendText = this.querySelector('#capacity-taf-heading').innerHTML;
    const basinContent = this.querySelector('.reservoir-capacity').innerHTML;
    const basinPopOver = this.buildPopOverElement({
      container,
      x: `${((fullWidth - 8) / fullWidth) * 100}%`,
      y: `50%`,
      xOffsetM: '65%',
      content: basinContent,
      legendText: basinLegendText,
      legendSvg: `
        <svg width="13" height="13" viewBox="0 0 10 10" aria-hidden="true">
          <rect x="0" y="0" width="10" height="10" class="capacity" />
        </svg>
      `
    });
    const basin = this.shadowRoot.querySelector('#basin-capacity');
    this.setUpPopOvers(basinPopOver, basin);
  }
}

window.customElements.define("drought-reservoir-levels", DroughtReservoirLevels);

export default DroughtReservoirLevels;