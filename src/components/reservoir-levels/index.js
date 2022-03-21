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

    const water = this.shadowRoot.querySelector('#basin-water');
    const waterDetail = this.shadowRoot.querySelector('#reservoir-details-filled');
    water.setAttribute('y', waterLevelY);
    water.setAttribute('height', waterHeight);
    this.setUpPopOvers(waterDetail, water);

    const historicalLine = this.shadowRoot.querySelector('#historical-line');
    const historicalHoverTarget = this.shadowRoot.querySelector('#historical-line-hover-target');
    const historicalLineDetail = this.shadowRoot.querySelector('#reservoir-details-average');
    historicalLine.setAttribute('y1', historicalLineY);
    historicalLine.setAttribute('y2', historicalLineY);
    historicalHoverTarget.setAttribute('y', historicalLinePadY);
    this.setUpPopOvers(historicalLineDetail, historicalHoverTarget);

    const basin = this.shadowRoot.querySelector('#basin-capacity');
    const basinDetail = this.shadowRoot.querySelector('#reservoir-details-capacity');
    this.setUpPopOvers(basinDetail, basin);
  }
}

window.customElements.define("drought-reservoir-levels", DroughtReservoirLevels);

export default DroughtReservoirLevels;