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

    const waterPopOver = this.shadowRoot.querySelector('#current-popover');
    const waterPopOverX = ((fullWidth - 28) / fullWidth) * 100;
    waterPopOver.setAttribute('style', `--x:${waterPopOverX}%; --y:70%; --x-offset-m:65%;`);

    const water = this.shadowRoot.querySelector('#basin-water');
    water.setAttribute('y', waterLevelY);
    water.setAttribute('height', waterHeight);
    this.setUpPopOvers(waterPopOver, water);

    const historicalPopOver = this.shadowRoot.querySelector('#historical-popover');
    const historicalPopOverX = ((fullWidth - 8) / fullWidth) * 100;
    historicalPopOver.setAttribute('style', `--x:${historicalPopOverX}%; --y:23%; --x-offset-m:65%;`);

    const historicalLine = this.shadowRoot.querySelector('#historical-line');
    const historicalHoverTarget = this.shadowRoot.querySelector('#historical-line-hover-target');
    historicalLine.setAttribute('y1', historicalLineY);
    historicalLine.setAttribute('y2', historicalLineY);
    historicalHoverTarget.setAttribute('y', historicalLinePadY);
    this.setUpPopOvers(historicalPopOver, historicalHoverTarget);

    const basinPopOver = this.shadowRoot.querySelector('#capacity-popover');
    const basinPopOverX = ((fullWidth - 8) / fullWidth) * 100;
    basinPopOver.setAttribute('style', `--x:${basinPopOverX}%; --y:50%; --x-offset-m:65%;`);

    const basin = this.shadowRoot.querySelector('#basin-capacity');
    this.setUpPopOvers(basinPopOver, basin);
  }
}

window.customElements.define("drought-reservoir-levels", DroughtReservoirLevels);

export default DroughtReservoirLevels;