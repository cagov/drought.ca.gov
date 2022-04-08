import sharedCss from './styles.css';
import sharedHtml from './template.html';

class DroughtDataVizBase extends window.HTMLElement {
  constructor(html, css) {
    super();

    let template = document.createElement('template');
    template.innerHTML = sharedHtml;

    let style = document.createElement('style');
    style.append(sharedCss);
    template.content.prepend(style);

    this.attachShadow({mode: "open"});
    this.shadowRoot.append(template.content.cloneNode(true));

    this.shadowRoot.querySelector('.component-body').innerHTML = html;
    this.shadowRoot.querySelector('style').append(css); 
  }

  buildPopOverElement({ container, x, y, legendSvg, legendText, content }) {
    const popOver = document.createElement('div');
    popOver.setAttribute('tabindex', '0');
    popOver.classList.add('popover-content');
    popOver.style.setProperty('--x', x);
    popOver.style.setProperty('--y', y);
    popOver.innerHTML = `
      <div class="popover-legend">
        ${legendSvg}
        <p class="popover-header">${legendText}</p>
      </div>
      <p class="popover-stat">${content}</p>
    `;
    container.append(popOver);
    return popOver;
  }

  setUpPopOvers(popOverContent, hoverTarget) {
    hoverTarget.addEventListener('mouseover', (event) => {
      popOverContent.classList.add('popover-revealed');
      hoverTarget.classList.add('highlighted');
    });
    
    popOverContent.addEventListener('focus', (event) => {
      popOverContent.classList.add('popover-revealed');
      hoverTarget.classList.add('highlighted');
    });

    hoverTarget.addEventListener('mouseout', (event) => {
      popOverContent.classList.remove('popover-revealed');
      hoverTarget.classList.remove('highlighted');
    });

    popOverContent.addEventListener('blur', (event) => {
      popOverContent.classList.remove('popover-revealed');
      hoverTarget.classList.remove('highlighted');
    });
  }
}

export default DroughtDataVizBase;