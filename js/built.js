var styles$2 = "/* accordion component specific classes */\ncagov-accordion .cagov-accordion-card {\n  border-radius: .3rem !important;\n  margin-bottom: 0;\n  min-height: 3rem;\n  margin-top: .5rem;\n  border: solid 1px #ededef !important;\n}\n\ncagov-accordion .accordion-card-container {\n  display: block;\n  overflow: hidden;\n}\n\ncagov-accordion button.accordion-card-header {\n  display: flex;\n  justify-content: left;\n  align-items: center;\n  padding: 0 0 0 1rem;\n  background-clip: border-box;\n  background-color: #EDEDEF;\n  border: none;\n  position: relative;\n  width: 100%;\n  line-height: 3rem;\n}\ncagov-accordion .accordion-title {\n  text-align: left;\n  margin-bottom: 0;\n  color: var(--primary-color, #064E66);\n  margin-right: auto;\n  width: 90%;\n  padding: 0 0.5rem 0 0 !important;\n  font-size: 1.125rem;\n  font-weight: bold;\n}\n\ncagov-accordion.prog-enhanced .accordion-card-container {\n  height: 0px;\n  transition: height 0.3s ease;\n}\ncagov-accordion.prog-enhanced .accordion-card-container .card-body {\n  padding-left: 1rem;\n}\n\ncagov-accordion .collapsed {\n  display: block;\n  overflow: hidden;\n  visibility: hidden;\n}\n\n.accordion-title h4,\n.accordion-title h3,\n.accordion-title h2 {\n  padding: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  font-size: 1.2rem !important;\n  font-weight: 700;\n  color: var(--primary-color, #064E66);\n  text-align: left !important;\n}\n\nbutton.accordion-card-header:hover {\n  background-color: var(--hover-color, #F9F9FA);\n}\nbutton.accordion-card-header:hover .accordion-title {\n  text-decoration: underline;\n}\nbutton.accordion-card-header:focus {\n  outline-offset: -2px;\n}\n\n.accordion-icon svg line {\n  stroke-width: 4px;  \n}\n\n.prog-enhanced .accordion-alpha .plus-minus {\n  width: 2.125rem;\n  height: 2.125rem;\n  border: none;\n  overflow: hidden;\n  margin-left: 1rem;\n  color: var(--primary-color, #064E66);\n  align-self: flex-start;\n}\n.prog-enhanced .accordion-alpha .plus-minus svg {\n  fill: var(--primary-color, #064E66);\n  width: 25px;\n  height: 25px;\n}\n\n.prog-enhanced .accordion-alpha-open cagov-plus .accordion-icon {\n  display: none !important;\n}\n.prog-enhanced .accordion-alpha-open cagov-minus .accordion-icon {\n  display: block !important;\n}\n\n@media only screen and (max-width: 767px) {\n  .accordion-alpha-open + .accordion-card-container {\n    height: 100% !important;\n  }\n}\n\n/*# sourceMappingURL=index.css.map */\n";

/**
 * Accordion web component that collapses and expands content inside itself on click.
 * 
 * @element cagov-accordion
 * 
 * @prop {class string} prog-enhanced - The element is open before any javascript executes so content can be read if an error occurs that prevents js execution. The prog-enhanced class is added to the element once javascript begins to execute. This triggers default collabsed state.
 * 
 * @fires click - Default value, will be defined by this.dataset.eventType.
 * 
 * @attr {string} [data-event-type=click] - dataset defined value for event type fired on click.
 * @attr {string} aria=expanded=true - set on the internal element .accordion-card-header. If this is true the accordion will be open before any user interaction.
 * 
 * @cssprop --primary-color - Default value of #1f2574, used for all colors of borders and fills
 * @cssprop --hover-color - Default value of #F9F9FA, used for background on hover
 * 
 */
class CaGovAccordion extends window.HTMLElement {
  constructor() {
    super();
    if (document.querySelector('api-viewer')) {
      let link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', './src/css/index.css');
      document.querySelector('api-viewer').shadowRoot.appendChild(link);
    }
  }

  connectedCallback() {
    this.classList.add('prog-enhanced');
    this.expandTarget = this.querySelector('.accordion-card-container');
    this.expandButton = this.querySelector('.accordion-card-header');
    if(this.expandButton) {
      this.expandButton.addEventListener('click', this.listen.bind(this));
    }
    this.activateButton = this.querySelector('.accordion-card-header');
    this.eventType = this.dataset.eventType ? this.dataset.eventType : 'click';

    // Detect if accordion should open by default
    let expanded = this.activateButton.getAttribute('aria-expanded');
    if (expanded === "true") {
      this.triggerAccordionClick(); // Open the accordion.
      let allLinks = this.querySelectorAll(".accordion-card-container a");
      let allbuttons = this.querySelectorAll(".accordion-card-container button");
      for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].removeAttribute("tabindex"); // remove tabindex from all the links
      }
      for (var i = 0; i < allbuttons.length; i++) {
        allbuttons[i].removeAttribute("tabindex"); // remove tabindex from all the buttons
      }
    }
    // making sure that all links inside of the accordion container are having tabindex -1
    else {
      let allLinks = this.querySelectorAll(".accordion-card-container a");
      let allbuttons = this.querySelectorAll(".accordion-card-container button");
      for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].setAttribute('tabindex', '-1');
      }
  
      for (var i = 0; i < allbuttons.length; i++) {
        allbuttons[i].setAttribute('tabindex', '-1');
      }
    }
  }

  listen() {
    if (!this.cardBodyHeight) {
      this.cardBodyHeight = this.querySelector('.card-body').clientHeight + 24;
    }
    if (this.expandTarget.clientHeight > 0) {
      this.closeAccordion();
    } else {
      this.expandAccordion();
    }
  }

  triggerAccordionClick() {
    const event = new MouseEvent(this.eventType, {
      view: window,
      bubbles: true,
      cancelable: true
    });
    this.expandButton.dispatchEvent(event);
  }

  closeAccordion() {
    this.expandTarget.style.height = '0px';
    this.expandTarget.setAttribute('aria-hidden', 'true');
    this.querySelector('.accordion-card-header').classList.remove('accordion-alpha-open');
    this.activateButton.setAttribute('aria-expanded', 'false');
    let allLinks = this.querySelectorAll(".accordion-card-container a");
    let allbuttons = this.querySelectorAll(".accordion-card-container button");
    for (var i = 0; i < allLinks.length; i++) {
      allLinks[i].setAttribute('tabindex', '-1'); // tabindex to all links
    }
    for (var i = 0; i < allbuttons.length; i++) {
      allbuttons[i].setAttribute('tabindex', '-1'); // tabindex to all buttons
    }
  }

  expandAccordion() {
    this.expandTarget.style.height = this.cardBodyHeight + 'px';
    this.expandTarget.setAttribute('aria-hidden', 'false');
    this.querySelector('.accordion-card-header').classList.add('accordion-alpha-open');
    this.querySelector('.accordion-card-container').classList.remove('collapsed');
    this.activateButton.setAttribute('aria-expanded', 'true');
    let allLinks = this.querySelectorAll(".accordion-card-container a");
    let allbuttons = this.querySelectorAll(".accordion-card-container button");
    for (var i = 0; i < allLinks.length; i++) {
      allLinks[i].removeAttribute("tabindex"); // remove tabindex from all the links
    }
    for (var i = 0; i < allbuttons.length; i++) {
      allbuttons[i].removeAttribute("tabindex"); // remove tabindex from all the buttons
    }
  }

}
window.customElements.define('cagov-accordion', CaGovAccordion);
const style$2 = document.createElement("style");
style$2.textContent = styles$2;
document.querySelector('head').appendChild(style$2);

function ratingsTemplate (question, yes, no, commentPrompt, thanksFeedback, thanksComments, submit) {
  return `
  <div class="feedback-form cagov-stack">
    <div class="js-feedback-form feedback-form-question">
      <label class="feedback-form-label" id="feedback-rating">${question}</label>
      <button class="feedback-form-button js-feedback-yes feedback-yes" id="feedback-yes" aria-labelledby="feedback-rating">${yes}</button>
      <button class="feedback-form-button js-feedback-no" id="feedback-no" aria-labelledby="feedback-rating">${no}</button>
    </div>
          
    <div class="feedback-form-thanks js-feedback-thanks" role="alert">${thanksFeedback}</div>
          
    <div class="feedback-form-add">
      <label class="feedback-form-label js-feedback-field-label" for="add-feedback">${commentPrompt}</label>
      <div class="feedback-form-add-grid">
        <textarea name="add-feedback" class="js-add-feedback feedback-form-textarea" id="add-feedback" rows="1"></textarea>
        <button class="feedback-form-button js-feedback-submit" type="submit" id="feedback-submit">${submit}</button>
      </div>
    </div>

    <div class="feedback-form-thanks feedback-thanks-add" role="alert">${thanksComments}</div>
  </div>`
}

var styles$1 = "cagov-feedback {\n  width: 100%;\n}\ncagov-feedback .feedback-form {\n  background: var(--standout-color, #2F4C2C);\n  padding: 1rem;\n  border-radius: 0.3125rem;\n}\ncagov-feedback .feedback-form-question {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n}\ncagov-feedback .feedback-form-label {\n  color: #fff;\n  display: block;\n  margin-right: 1rem;\n  transition: 0.3s color cubic-bezier(0.57, 0.2, 0.21, 0.89);\n  line-height: 3rem;\n  width: 100%;\n}\n@media (min-width: 48rem) {\n  cagov-feedback .feedback-form-label {\n    width: auto;\n  }\n}\ncagov-feedback .feedback-form-button {\n  padding: 1rem;\n  color: var(--standout-color, #2F4C2C);\n  border: none;\n  border-radius: 0.3rem;\n  transition: 0.3s background cubic-bezier(0.57, 0.2, 0.21, 0.89);\n  cursor: pointer;\n  margin: 0 0.5rem 0 0;\n  display: inline !important;\n  /* defensive overrides */\n  position: relative;\n  text-transform: none;\n  top: auto;\n  right: auto;\n  background: #fff;\n}\ncagov-feedback .feedback-form-button:hover {\n  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);\n  text-decoration: underline;\n}\ncagov-feedback .feedback-form-button:focus {\n  box-shadow: 0 0 0 2px #fff;\n}\ncagov-feedback .feedback-form-button .feedback-yes {\n  margin-right: 1rem;\n}\ncagov-feedback .feedback-form-add {\n  padding-top: 2rem;\n  display: none;\n}\n@media (min-width: 48rem) {\n  cagov-feedback .feedback-form-add {\n    text-align: left;\n    padding-top: 0;\n  }\n}\ncagov-feedback .feedback-form-add-grid {\n  position: relative;\n  margin-top: 1rem;\n}\n@media (min-width: 48rem) {\n  cagov-feedback .feedback-form-add-grid {\n    display: inline-flex;\n    flex-flow: column;\n    align-items: flex-start;\n  }\n}\ncagov-feedback .feedback-form-textarea {\n  width: 100%;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  font-family: \"Roboto\", sans-serif;\n  color: darkblue;\n  max-width: 90%;\n  height: 127px;\n  width: 600px;\n}\ncagov-feedback .feedback-form-thanks {\n  display: none;\n  color: #fff;\n}\ncagov-feedback .feedback-form-error {\n  position: relative;\n  top: 100%;\n  left: 0;\n  display: none;\n  font-weight: 300;\n  text-align: left;\n}\n\n/*# sourceMappingURL=index.css.map */\n";

/**
 * Page feedback web component that asks if you found what you were looking for, then prompts for comments
 * 
 * @element cagov-feedback
 * 
 * @fires ratedPage - custom event with object with detail value of whether the user clicked yes or no to the first question: {detail: "yes"}. This can be used to send that value as a GA event outside this component.
 * 
 * @attr {string} [data-question] - "Did you find what you were looking for?";
 * @attr {string} [data-yes] - "Yes";
 * @attr {string} [data-no] - "No";
 * @attr {string} [data-commentPrompt] - "What was the problem?";
 * @attr {string} [data-positiveCommentPrompt] - "Great! What were you looking for today?";
 * @attr {string} [data-thanksFeedback] - "Thank you for your feedback!";
 * @attr {string} [data-thanksComments] - "Thank you for your comments!";
 * @attr {string} [data-submit] - "Submit";
 * @attr {string} [data-anythingToAdd] - "If you have anything to add,"
 * @attr {string} [data-anyOtherFeedback] - "If you have any other feedback about this website,"
 *
 * @cssprop --primary-color - Default value of #064E66, used for background
 */
class CAGovFeedback extends window.HTMLElement {
  constructor() {
    super();
    if (document.querySelector('api-viewer')) {
      let link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', './src/css/index.css');
      document.querySelector('api-viewer').shadowRoot.appendChild(link);
    }
  }

  connectedCallback() {
    let question = this.dataset.question
      ? this.dataset.question
      : "Did you find what you were looking for?";
    let yes = this.dataset.yes ? this.dataset.yes : "Yes";
    let no = this.dataset.no ? this.dataset.no : "No";
    let commentPrompt = this.dataset.commentPrompt
      ? this.dataset.commentPrompt
      : "What was the problem?";
    this.positiveCommentPrompt = this.dataset.positiveCommentPrompt
      ? this.dataset.positiveCommentPrompt
      : "Great! What were you looking for today?";
    let thanksFeedback = this.dataset.thanksFeedback
      ? this.dataset.thanksFeedback
      : "Thank you for your feedback!";
    let thanksComments = this.dataset.thanksComments
      ? this.dataset.thanksComments
      : "Thank you for your comments!";
    let submit = this.dataset.submit ? this.dataset.submit : "Submit";
    this.dataset.characterLimit
      ? this.dataset.characterLimit
      : "You have reached your character limit.";
    this.dataset.anythingToAdd
      ? this.dataset.anythingToAdd
      : "If you have anything to add,";
    this.dataset.anyOtherFeedback
      ? this.dataset.anyOtherFeedback
      : "If you have any other feedback about this website,";

    this.endpointUrl = this.dataset.endpointUrl;
    let html = ratingsTemplate(
      question,
      yes,
      no,
      commentPrompt,
      thanksFeedback,
      thanksComments,
      submit);
    this.innerHTML = html;
    this.applyListeners();
  }

  applyListeners() {
    this.wasHelpful = "";
    this.querySelector(".js-add-feedback").addEventListener(
      "focus",
      (event) => {
        this.querySelector(".js-feedback-submit").style.display = "block";
      }
    );
    let feedback = this.querySelector(".js-add-feedback");
    feedback.addEventListener("keyup", function (event) {
      if (feedback.value.length > 15) {
        feedback.setAttribute("rows", "3");
      } else {
        feedback.setAttribute("rows", "1");
      }
    });

    feedback.addEventListener("blur", (event) => {
      if (feedback.value.length !== 0) {
        this.querySelector(".js-feedback-submit").style.display = "block";
      }
    });
    this.querySelector(".js-feedback-yes").addEventListener(
      "click",
      (event) => {
        this.querySelector('.js-feedback-field-label').innerHTML = this.positiveCommentPrompt;
        this.querySelector(".js-feedback-form").style.display = "none";
        this.querySelector(".feedback-form-add").style.display = "block";
        this.wasHelpful = "yes";
        this.dispatchEvent(
          new CustomEvent("ratedPage", {
            detail: this.wasHelpful,
          })
        );
      }
    );
    this.querySelector(".js-feedback-no").addEventListener("click", (event) => {
      this.querySelector(".js-feedback-form").style.display = "none";
      this.querySelector(".feedback-form-add").style.display = "block";
      this.wasHelpful = "no";
      this.dispatchEvent(
        new CustomEvent("ratedPage", {
          detail: this.wasHelpful,
        })
      );
    });
    this.querySelector(".js-feedback-submit").addEventListener(
      "click",
      (event) => {
        this.querySelector(".feedback-form-add").style.display = "none";
        this.querySelector(".feedback-thanks-add").style.display = "block";

        let postData = {};
        postData.url = window.location.href;
        postData.helpful = this.wasHelpful;
        postData.comments = feedback.value;
        postData.userAgent = navigator.userAgent;

        fetch(this.endpointUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    );
  }
}
window.customElements.define('cagov-feedback', CAGovFeedback);
const style$1 = document.createElement("style");
style$1.textContent = styles$1;
document.querySelector('head').appendChild(style$1);

/**
 * Minus web component, inlines an svg minus symbol so it can be styled dynamically
 * 
 * @element cagov-minus
 * 
 */
class CaGovMinus extends window.HTMLElement {

  connectedCallback() {
    this.innerHTML = `<div class="accordion-icon" aria-hidden="true">
        <svg viewbox="0 0 25 25">
            <title>Minus</title>
            <line x1="6" y1="12.5" x2="19" y2="12.5"  fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />
        </svg>
      </div>`;
  }


}
window.customElements.define('cagov-minus', CaGovMinus);

function pageListItem(label, number) {
  return `<li class="cagov-pagination__item">
    <a
      href="javascript:void(0);"
      class="cagov-pagination__button"
      aria-label="${label} ${number}"
      data-page-num="${number}"
    >
      ${number}
    </a>
  </li>`;
}

function pageOverflow() {
  return `<li
    class="cagov-pagination__item cagov-pagination__overflow"
    role="presentation"
  >
    <span> … </span>
  </li>`;
}

function templateHTML (next, previous, page, currentPage, totalPages) {
  return `<nav aria-label="Pagination" class="cagov-pagination">
    <ul class="cagov-pagination__list">
      <li class="cagov-pagination__item">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__link cagov-pagination__previous-page"
          aria-label="${previous} ${page}"
        >
          <span class="cagov-pagination__link-text ${(currentPage > 2) ? '' : 'cagov-pagination__link-inactive'}"> ${previous} </span>
        </a>
      </li>
      ${(currentPage > 2) ? pageListItem(page, 1) : ''}

      ${(currentPage > 3) ? pageOverflow() : ''}

      ${(currentPage > 1) ? pageListItem(page, currentPage - 1) : ''}

      <li class="cagov-pagination__item cagov-pagination-current">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__button"
          aria-label="Page ${currentPage}"
          aria-current="page"
          data-page-num="${currentPage}"
        >
          ${currentPage}
        </a>
      </li>

      ${(currentPage < totalPages) ? pageListItem(page, currentPage + 1) : ''}

      ${(currentPage < totalPages - 3) ? pageOverflow() : ''}

      ${(currentPage < totalPages - 1) ? pageListItem(page, totalPages) : ''}

      <li class="cagov-pagination__item">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__link cagov-pagination__next-page"
          aria-label="${next} ${page}"
        >
          <span class="cagov-pagination__link-text ${(currentPage > totalPages - 1) ? 'cagov-pagination__link-inactive' : ''}"> ${next} </span>
        </a>
      </li>
    </ul>
  </nav>`
}

var styles = "cagov-pagination .cagov-pagination__list {\n  list-style: none;\n  margin: 0;\n  padding: 0 !important;\n  display: flex;\n}\ncagov-pagination .cagov-pagination__item {\n  border: 1px solid #EDEDEF;\n  border-radius: 0.3rem;\n  margin: 0.25rem;\n}\ncagov-pagination .cagov-pagination__item a {\n  padding: 0.75rem 0.875rem;\n  display: inline-block;\n  color: var(--primary-color, #064E66);\n  text-decoration: none;\n}\ncagov-pagination .cagov-pagination__item:hover {\n  background: #F9F9FA;\n}\ncagov-pagination .cagov-pagination__item:hover a {\n  text-decoration: underline;\n}\ncagov-pagination .cagov-pagination__item.cagov-pagination-current {\n  background-color: #064E66;\n  background-color: var(--primary-color, #064E66);\n}\ncagov-pagination .cagov-pagination__item.cagov-pagination-current a {\n  color: #fff;\n}\ncagov-pagination .cagov-pagination__item.cagov-pagination__overflow {\n  border: none;\n  padding: 0.875rem 0;\n}\ncagov-pagination .cagov-pagination__item.cagov-pagination__overflow:hover {\n  background: inherit;\n}\ncagov-pagination .cagov-pagination__link-inactive {\n  color: grey;\n  border-color: grey;\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n/*# sourceMappingURL=index.css.map */\n";

/**
 * Pagination web component
 * 
 * @element cagov-pagination
 * 
 * @fires paginationClick - custom event with object with detail value of current page: {detail: 1}
 * 
 * @attr {string} [data-yes] - "Yes";
 * @attr {string} [data-no] - "No";
 *
 * @cssprop --primary-color - Default value of #064E66, used for text, border color
 */
class CAGovPagination extends window.HTMLElement {
  constructor() {
    super();
    if (document.querySelector('api-viewer')) {
      let link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', './src/css/index.css');
      document.querySelector('api-viewer').shadowRoot.appendChild(link);
    }
  }

  // add jsdoc event
  // add jsdoc event to feedback too

  connectedCallback() {
    this.currentPage = parseInt(this.dataset.currentPage ? this.dataset.currentPage : "1");
    this.render();
  }

  render() {
    let previous = this.dataset.previous ? this.dataset.previous : "&#60;";
    let next = this.dataset.next ? this.dataset.next : "&#62;";
    let page = this.dataset.page ? this.dataset.page : "Page";
    this.totalPages = this.dataset.totalPages ? this.dataset.totalPages : "1";
    let html = templateHTML(
      next,
      previous,
      page,
      this.currentPage,
      this.totalPages
    );
    this.innerHTML = html;
    this.applyListeners();
  }

  static get observedAttributes() {
    return ['data-current-page', 'data-total-pages'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-current-page') {
      this.currentPage = parseInt(newValue);
      this.render();
    }
  }

  applyListeners() {
    let pageLinks = this.querySelectorAll(".cagov-pagination__button");
    pageLinks.forEach(function(pl) {
      pl.addEventListener("click", (event) => {
        this.currentPage = parseInt(event.target.dataset.pageNum);
        this.dispatchEvent(
          new CustomEvent("paginationClick", {
            detail: this.currentPage
          })
        );
        this.dataset.currentPage = this.currentPage;
      });  
    }.bind(this));
    this.querySelector('.cagov-pagination__previous-page').addEventListener("click", (event) => {
      if(!event.target.classList.contains('cagov-pagination__link-inactive')) {
        this.currentPage--;
        if(this.currentPage < 1) { this.currentPage = 1; }
        this.dispatchEvent(
          new CustomEvent("paginationClick", {
            detail: this.currentPage
          })
        );
        this.dataset.currentPage = this.currentPage;
      }
    });
    this.querySelector('.cagov-pagination__next-page').addEventListener("click", (event) => {
      if(!event.target.classList.contains('cagov-pagination__link-inactive')) {
        this.currentPage++;
        if(this.currentPage > this.totalPages) { this.currentPage = this.totalPages; }
        this.dispatchEvent(
          new CustomEvent("paginationClick", {
            detail: this.currentPage
          })
        );
        this.dataset.currentPage = this.currentPage;
      }
    });
  }
}
window.customElements.define('cagov-pagination', CAGovPagination);
const style = document.createElement("style");
style.textContent = styles;
document.querySelector('head').appendChild(style);

/**
 * Plus web component, inlines an svg plus symbol so it can be styled dynamically
 * 
 * @element cagov-plus
 * 
 */
class CaGovPlus extends window.HTMLElement {

  connectedCallback() {
    this.innerHTML = `<div class="accordion-icon" aria-hidden="true">
        <svg viewbox="0 0 25 25">
            <title>Plus</title>
            <line x1="6" y1="12.5" x2="19" y2="12.5" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />
            <line y1="6" x1="12.5" y2="19" x2="12.5" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />
        </svg>
      </div>`;
  }


}
window.customElements.define('cagov-plus', CaGovPlus);

class CAGOVOverlayNav extends window.HTMLElement {
  connectedCallback () {
    this.menuContentFile = this.dataset.json;
    this.querySelector('.open-menu').addEventListener('click', this.toggleMainMenu.bind(this));
    this.expansionListeners();
    document.addEventListener('keydown', this.escapeMainMenu.bind(this));
    document.body.addEventListener('click',this.bodyClick.bind(this));
  }

  toggleMainMenu () {
    if (this.querySelector('.hamburger').classList.contains('is-active')) {
      this.closeMainMenu();
    } else {
      this.openMainMenu();
    }
  }

  openMainMenu () {
    this.classList.add('display-menu');
    this.querySelector('.hamburger').classList.add('is-active');
    this.querySelector('.menu-trigger').classList.add('is-fixed');
    var menLabel = this.querySelector('.menu-trigger-label');
    menLabel.innerHTML = menLabel.getAttribute('data-closelabel');
  }

  closeMainMenu () {
    this.classList.remove('display-menu');
    this.classList.remove('reveal-items');
    this.querySelector('.hamburger').classList.remove('is-active');
    this.querySelector('.menu-trigger').classList.remove('is-fixed');
    var menLabel = this.querySelector('.menu-trigger-label');
    menLabel.innerHTML =  menLabel.getAttribute('data-openlabel');
  }

  escapeMainMenu (event) {
    // Close menus if user presses escape key.
    if (event.keyCode === 27) { this.closeAllMenus(); }
  }

  bodyClick (event) {
    if(!event.target.closest('cagov-navoverlay')) {
      this.closeAllMenus();
    }
  }

  closeAllMenus() {
    const allMenus = this.querySelectorAll('.js-cagov-navoverlay-expandable');
    allMenus.forEach(menu => {
      let expandedEl = menu.querySelector('.expanded-menu-section');
      expandedEl.classList.remove('expanded');
      menu.setAttribute('aria-expanded', 'false');
      let closestDropDown = menu.querySelector('.expanded-menu-dropdown');
      if (closestDropDown) {
        closestDropDown.setAttribute('aria-hidden', 'true');
        let allLinks = closestDropDown.querySelectorAll("a");
        for (var i = 0; i < allLinks.length; i++) {
          allLinks[i].setAttribute('tabindex', '-1'); // set tabindex to -1 so you cannot tab through these hidden links
        }
      }
    });
  }

  expansionListeners () {
    const allMenus = this.querySelectorAll('.js-cagov-navoverlay-expandable');
    allMenus.forEach(menu => {
      const nearestMenu = menu.querySelector('.expanded-menu-section');
      if (nearestMenu) {
        const nearestMenuDropDown = nearestMenu.querySelector('.expanded-menu-dropdown');
        if (nearestMenuDropDown) {
          nearestMenuDropDown.setAttribute('aria-hidden', 'true');
          menu.setAttribute('aria-expanded', 'false');
        }
      }
      let menuComponent = this;
      menu.addEventListener('click', function (event) {
        let menuLinkEl = this.querySelector('.expanded-menu-section-header-link');
        if(menuLinkEl.nodeName === 'A') {
          window.location = menuLinkEl.href;
        } else {
          event.preventDefault();
          let expandedEl = this.querySelector('.expanded-menu-section');
          if(expandedEl) {
            if(expandedEl.classList.contains('expanded')) {
              // closing an open menu
              menuComponent.closeAllMenus();
            } else {
              menuComponent.closeAllMenus();
              expandedEl.classList.add('expanded');
              this.setAttribute('aria-expanded', 'true');
              let closestDropDown = this.querySelector('.expanded-menu-dropdown');
              if (closestDropDown) {
                closestDropDown.setAttribute('aria-hidden', 'false');
                let allLinks = closestDropDown.querySelectorAll("a");
                for (var i = 0; i < allLinks.length; i++) {
                  allLinks[i].removeAttribute("tabindex"); // remove tabindex from all the links
                }
              }
            }
          }
        }
      });
    });
  }
}
window.customElements.define('cagov-navoverlay', CAGOVOverlayNav);

/**
 * Content Navigation web component
 * Supported endpoints: Wordpress v2
 * Wordpress Dependencies: window.wp.moment
 */
 class CAGovContentNavigation extends window.HTMLElement {
  connectedCallback() {
    this.type = "wordpress";

    /* https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js */
    /* Smooth scroll polyfill for safari, since it does not support scroll behaviors yet - can be moved to a dependency bundle split out by browser support later or in headless implementation */
    !function(){function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset));},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)));},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t);}else {if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop);}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop));},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){for(;o!==t.body&&!1===(e=p(l=o,"Y")&&a(l,"Y"),r=p(l,"X")&&a(l,"X"),e||r);)o=o.parentNode||o.host;var l,e,r;return o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"});}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0]);};}function n(o,t){this.scrollLeft=o,this.scrollTop=t;}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return !0;if("object"==typeof o&&"smooth"===o.behavior)return !1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return "Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return "auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t));}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r});}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o();}();

    if (this.type === "wordpress") {
      document.addEventListener("DOMContentLoaded", () =>
        this.buildContentNavigation()
      );
    }
  }

  buildContentNavigation() {
    // Parse header tags
    let markup = this.getHeaderTags();
    let label = null;
    if (markup !== null) {
      label = this.dataset.label || "On this page";
    }
    let content = null;
    if (markup !== null) {
      content = `<div class="label">${label}</div> ${markup}`;
    }

    this.template({ content }, "wordpress");
  }

  template(data, type) {
    if (data !== undefined && data !== null && data.content !== null) {
      if (type === "wordpress") {
        this.innerHTML = `${data.content}`;
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        let hashval = anchor.getAttribute("href");
        try {
          let target = document.querySelector(hashval);
          if (target !== null) {
            let position = target.getBoundingClientRect();

            const prefersReducedMotion = window.matchMedia(
              "(prefers-reduced-motion)"
            ).matches;

            // console.log("prefersReducedMotion", prefersReducedMotion);
            if (!prefersReducedMotion) {
              window.scrollTo({
                behavior: "smooth",
                left: position.left,
                top: position.top - 200,
              });
            }

            history.pushState(null, null, hashval);
          }
        } catch (error) {
          console.error(error);
        }
        e.preventDefault();
      });
    });

    return null;
  }

  renderNoContent() {
    this.innerHTML = "";
  }

  getHeaderTags() {
    let selector = this.dataset.selector;
    this.dataset.editor;
    this.dataset.label;
    this.dataset.callback; // Editor only right now

    var h = ["h2"];
    for (var i = 0; i < h.length; i++) {
      // Pull out the header tags, in order & render as links with anchor tags
      // auto convert h tags with tag names
      if (selector !== undefined && selector !== null) {
        {
          let selectorContent = document.querySelector(selector);
          if (selectorContent !== null) {
            let outline = this.outliner(selectorContent);
            return outline;
          }
        }
      }
    }
    return null;
  }

  outliner(content) {
    let headers = content.querySelectorAll("h2");
    let output = ``;
    if (headers !== undefined && headers !== null && headers.length > 0) {
      headers.forEach((tag) => {
        let tagId = tag.getAttribute("id");
        let title = tag.innerHTML;

        let anchor = tag.innerHTML.toLowerCase().trim().replace(/ /g, "-").replace(/\(|\)|\!|\"|\#|\$|\%|\&|\'|\*|\+|\,|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\]|\\|\^|\`|\{|\||\|\}|\~/g, "");
        // These are the CSS unallowed characters.
        // !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, `, {, |, }, and ~.

        // If id not set already, create an id to jump to.
        if (tagId !== undefined && tagId !== null) {
          anchor = tagId;
        }

        output += `<li><a href="#${encodeURI(anchor)}">${title}</a></li>`;

        if (tagId === undefined || tagId === null) {
          tagId = anchor;
          tag.setAttribute("id", tagId);
        }
      });
      return `<ul>${output}</ul>`;
    }
    return null;
  }
}

if (customElements.get("cagov-content-navigation") === undefined) {
  window.customElements.define(
    "cagov-content-navigation",
    CAGovContentNavigation
  );
}

/**
 * News List web component
 * Supported endpoints: Wordpress v2
 * Wordpress Dependencies: window.wp.moment, cagov-pagination
 */
 class CAGovPostList extends window.HTMLElement {
  connectedCallback() {
    let siteUrl = window.location.origin;
    this.endpoint = this.dataset.endpoint || `${siteUrl}/wp-json/wp/v2`;
    this.order = this.dataset.order || "desc";
    this.count = this.dataset.count || "10";
    this.category = this.dataset.category || "announcements,press-releases";
    this.showExcerpt = this.dataset.showExcerpt || true;
    this.noResults = this.dataset.noResults || "No results found";
    this.showPublishedDate = this.dataset.showPublishedDate || true;
    this.showPagination = this.dataset.showPagination === "true" ? true : false;
    this.filter = this.dataset.filter ? this.dataset.filter : "none"; // Accepts types of filtering
    this.readMore = this.dataset.readMore || "";
    this.type = this.dataset.type || "wordpress";
    this.currentPage = 1;
    this.categoryMap = {};
    if (this.type === "wordpress") {
      this.getWordpressPosts();
    }
  }

  getWordpressPosts() {
    if (this.endpoint !== undefined) {
      if (this.category.indexOf(",") > -1) {
        this.category = this.category.split(",");
      } else {
        this.category = [this.category];
      }

      let categoryEndpoint = `${this.endpoint}/categories?slug=${this.category}`;
      // console.log("category endpoint", categoryEndpoint, this.dataset);

      // Get data
      window
        .fetch(categoryEndpoint)
        .then((response) => response.json())
        .then(
          function (data) {
            // Category has no data.
            if (data.length === 0) {
              return this.renderNoPosts();
            }
            let itemCount = 0;
            data.map((item) => {
              itemCount += item.count;
            });

            let categoryIds = data.map((item) => {
              this.categoryMap[item.id] = item;
              return item.id;
            });

            let postsEndpoint = `${this.endpoint}/posts?`;

            if (categoryIds !== undefined && categoryIds.length > 0) {
              postsEndpoint += `categories=${categoryIds.join(",")}`;
            }
            if (this.count) {
              postsEndpoint += `&per_page=${this.count}`;
            }
            if (this.order) {
              postsEndpoint += `&order=${this.order}`;
            }
            if (this.currentPage) {
              postsEndpoint += `&page=${this.currentPage}`;
            }

            // @TODO add some filters
            if (this.filter === "today-or-after") ; else if (this.filter === "before-yesterday") ;
            window
              .fetch(postsEndpoint)
              .then((response) => response.json())
              .then(
                function (posts) {
                  if (posts !== undefined) {
                    // Set posts content.
                    if (!this.querySelector(".post-list-results")) {
                      this.innerHTML = `<div class="post-list-results"></div>`;
                      if (this.showPagination === true) {
                        // console.log("Trying to show pagination");
                        this.innerHTML = `<div class="post-list-results"></div><cagov-pagination data-current-page="${
                          this.currentPage
                        }" data-total-pages="${parseInt(
                          itemCount / this.count
                        )}"></cagov-pagination>`;
                      }
                    }
                    this.querySelector(".post-list-results").innerHTML =
                      this.template(posts, "wordpress", itemCount);
                    if (this.querySelector("cagov-pagination") !== null) {
                      this.querySelector("cagov-pagination").addEventListener(
                        "paginationClick",
                        function (event) {
                          if (event.detail) {
                            this.currentPage = event.detail;
                            this.getWordpressPosts();
                          }
                        }.bind(this),
                        false
                      );
                    }
                  }
                }.bind(this)
              )
              .catch((error) => {
                console.error(error);
                this.renderNoPosts();
              });
          }.bind(this)
        )
        .catch((error) => {
          console.error(error);
          this.renderNoPosts();
        });
    }
  }

  template(posts, type) {
    if (posts !== undefined && posts !== null && posts.length > 0) {
      if (type === "wordpress") {
        let renderedPosts = posts.map((post) => {
          // console.log(post);
          return this.renderWordpressPostTitleDate(post);
        });
        return `<div class="post-list-items">${renderedPosts.join("")}</div>${
          this.readMore
        }`;
      }
    } else {
      return `<div class="no-results">${this.noResults}</div>`;
    }
    return null;
  }

  renderNoPosts() {
    this.innerHTML = `<div class="post-list-no-results">${this.noResults}</div>`;
  }

  /**
   * Render wordpress post with title and date
   * @param {*} param0
   * @returns
   */
  renderWordpressPostTitleDate({
    title = null,
    link = null,
    date = null,
    content = null,
    excerpt = null,
    author = null,
    featured_media = null,
    categories = null,
    format = "standard",
    design_system_fields = null,
    headless = false,
  }) {
    // Fix API mapping

    // console.log('headless', headless);

    if (format === "link" && design_system_fields !== null) {

      if (design_system_fields.post !== undefined) {
        if (
          design_system_fields.post.post_link !== undefined &&
          design_system_fields.post.post_link !== null &&
          design_system_fields.post.post_link !== ""
        ) {
          link = design_system_fields.post.post_link;
        }
      }
    }

    let dateFormatted;
    if (date !== null && window.moment !== undefined) {
      // if (moment !== undefined) {
      //   dateFormatted = moment(date).format("MMMM DD, YYYY");
      // } 

      if (design_system_fields.post !== undefined) {
          try {
          dateFormatted = design_system_fields.post.post_published_date_display.i18n_locale_date;
          } catch (error) {
            console.error(error);
          }
      }
    }

    let getExcerpt =
      this.showExcerpt === "true"
        ? `<div class="excerpt"><p>${excerpt.rendered}</p></div>`
        : ``;
    let getDate =
      this.showPublishedDate === "true"
        ? `<div class="date">${dateFormatted}</div>`
        : ``;

    if (format === "status" && this.showExcerpt === "true") {
      getExcerpt = `<div class="excerpt"><p>${content.rendered}</p></div>`;
    }

    let category_type = "";

    if (format === "status") {
      return `<div class="post-list-item post-status">
          ${category_type}
          <div class="link-title">
            ${getDate}
          </div>
          ${getExcerpt}
          
      </div>
      `;
    }

    return `<div class="post-list-item">
                ${category_type}
                <div class="link-title"><a href="${link}">
                    ${title.rendered}
                </a></div>
                ${getExcerpt}
                ${getDate}
            </div>
            `;
  }
}

if (customElements.get("cagov-post-list") === undefined) {
  window.customElements.define("cagov-post-list", CAGovPostList);
}

/**
 * Page Alert web component
 * Supported endpoints: Wordpress v2
 */
class CAGovPageAlert extends window.HTMLElement {
  connectedCallback() {
    this.type = "wordpress";
    this.message = this.dataset.message || "";
    this.icon = this.dataset.icon || "";

    if (this.type === "wordpress") {
      document.addEventListener("DOMContentLoaded", () => {
        this.template({ message: this.message, icon: this.icon }, "wordpress");
        document.querySelector('cagov-page-alert .close-button').addEventListener('click', (e) => {
          document.querySelector('cagov-page-alert').style.display = "none";
        });
      }
      );
    }
  }

  template(data, type) {
    if (data !== undefined && data !== null && data.content !== null) {
      if (type === "wordpress") {
        this.innerHTML = `<div class="cagov-page-alert cagov-stack"><div class="icon"><span class="${this.icon}"></span></div>
        <div class="body">${this.message}</div>
        <div class="close-button"><span class="ca-gov-icon-close-line"></span></div></div>`;
      }
    }

    return null;
  }
}

if (customElements.get("cagov-page-alert") === undefined) {
  window.customElements.define("cagov-page-alert", CAGovPageAlert);
}

// setupAnalytics


function setupAnalytics() {
    console.log("Setting up analytics");
}

window.onload = (event) => {
    setupAnalytics();
};
