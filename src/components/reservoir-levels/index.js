import styles from './styles.css';
import html from './template.html';

class CaGovReservoirLevels extends window.HTMLElement {
  constructor() {
    super();

    let template = document.createElement('template');
    template.innerHTML = html;

    let style = document.createElement('style');
    style.append(styles);
    template.content.prepend(style);

    this.attachShadow({mode: "open"})
    this.shadowRoot.append(template.content.cloneNode(true));
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
    this.setUpPopOvers(water, waterDetail);

    const historicalLine = this.shadowRoot.querySelector('#historical-line');
    const historicalHoverTarget = this.shadowRoot.querySelector('#historical-line-hover-target');
    const historicalLineDetail = this.shadowRoot.querySelector('#reservoir-details-average');
    historicalLine.setAttribute('y1', historicalLineY);
    historicalLine.setAttribute('y2', historicalLineY);
    historicalHoverTarget.setAttribute('y', historicalLinePadY);
    this.setUpPopOvers(historicalHoverTarget, historicalLineDetail);

    const basin = this.shadowRoot.querySelector('#basin-capacity');
    const basinDetail = this.shadowRoot.querySelector('#reservoir-details-capacity');
    this.setUpPopOvers(basin, basinDetail);
  }

  setUpPopOvers(hoverTarget, popOverContent) {
    hoverTarget.addEventListener('mouseover', (event) => {
      popOverContent.classList.add('reservoir-details-revealed');
      hoverTarget.classList.add('highlighted');
    });
    
    popOverContent.addEventListener('focus', (event) => {
      popOverContent.classList.add('reservoir-details-revealed');
      hoverTarget.classList.add('highlighted');
    });

    hoverTarget.addEventListener('mouseout', (event) => {
      popOverContent.classList.remove('reservoir-details-revealed');
      hoverTarget.classList.remove('highlighted');
    });

    popOverContent.addEventListener('blur', (event) => {
      popOverContent.classList.remove('reservoir-details-revealed');
      hoverTarget.classList.remove('highlighted');
    });
  }
}

window.customElements.define("cagov-reservoir-levels", CaGovReservoirLevels);

export default { CaGovReservoirLevels }