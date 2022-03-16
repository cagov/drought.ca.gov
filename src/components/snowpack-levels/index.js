import styles from './styles.css';
import html from './template.html';
import data from './snowpackConditions.json';

class CaGovSnowpackLevels extends window.HTMLElement {
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
    const graph = this.shadowRoot.querySelector('#snowpack-graph');
    const peak = 20;
    const floor = 145;
    const range = floor - peak;

    const avgPathD = data.avg.reduce((bucket, entry, index) => {
      // Just remove the leap year day.
      if (entry.month === 2 && entry.day === 29) {
        return bucket;
      }

      const y = Math.round(peak + (range - (range * entry.avg)));
      bucket.push(`L${index},${y}`);

      return bucket;
    }, []);

    const currentPathD = data.swe.reduce((bucket, entry, index) => {
      // Just remove the leap year day.
      const date = new Date(entry.swcDate);
      if (date.getMonth() === 2 && date.getDate() === 29) {
        return bucket;
      }

      const y = Math.round(peak + (range - (range * (entry.pctApr1 / 100))));
      bucket.push(`L${index},${y}`);

      return bucket;
    }, []);

    const avgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    avgPath.setAttribute('d', `M0,${floor} ${avgPathD.join(' ')} z`);
    avgPath.classList.add('avg');
    graph.append(avgPath);

    const currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    currentPath.setAttribute('d', `M0,${floor} ${currentPathD.join(' ')}`);
    currentPath.classList.add('current');
    graph.append(currentPath);
  
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '182');
    circle.setAttribute('cy', peak);
    circle.setAttribute('r', '4');
    graph.append(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '170');
    text.setAttribute('y', peak);
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'end');
    text.innerHTML = 'Historic peak';
    graph.append(text);
  }
}

window.customElements.define("cagov-snowpack-levels", CaGovSnowpackLevels);

export default { CaGovSnowpackLevels }