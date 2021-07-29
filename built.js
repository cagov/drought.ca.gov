class e extends window.HTMLElement{constructor(){if(super(),document.querySelector("api-viewer")){let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href","./src/css/index.css"),document.querySelector("api-viewer").shadowRoot.appendChild(e)}}connectedCallback(){if(this.classList.add("prog-enhanced"),this.expandTarget=this.querySelector(".accordion-card-container"),this.expandButton=this.querySelector(".accordion-card-header"),this.expandButton&&this.expandButton.addEventListener("click",this.listen.bind(this)),this.activateButton=this.querySelector(".accordion-card-header"),this.eventType=this.dataset.eventType?this.dataset.eventType:"click","true"===this.activateButton.getAttribute("aria-expanded")){this.triggerAccordionClick();let t=this.querySelectorAll(".accordion-card-container a"),n=this.querySelectorAll(".accordion-card-container button");for(var e=0;e<t.length;e++)t[e].removeAttribute("tabindex");for(e=0;e<n.length;e++)n[e].removeAttribute("tabindex")}else{let t=this.querySelectorAll(".accordion-card-container a"),n=this.querySelectorAll(".accordion-card-container button");for(e=0;e<t.length;e++)t[e].setAttribute("tabindex","-1");for(e=0;e<n.length;e++)n[e].setAttribute("tabindex","-1")}}listen(){this.cardBodyHeight||(this.cardBodyHeight=this.querySelector(".card-body").clientHeight+24),this.expandTarget.clientHeight>0?this.closeAccordion():this.expandAccordion()}triggerAccordionClick(){const e=new MouseEvent(this.eventType,{view:window,bubbles:!0,cancelable:!0});this.expandButton.dispatchEvent(e)}closeAccordion(){this.expandTarget.style.height="0px",this.expandTarget.setAttribute("aria-hidden","true"),this.querySelector(".accordion-card-header").classList.remove("accordion-alpha-open"),this.activateButton.setAttribute("aria-expanded","false");let e=this.querySelectorAll(".accordion-card-container a"),t=this.querySelectorAll(".accordion-card-container button");for(var n=0;n<e.length;n++)e[n].setAttribute("tabindex","-1");for(n=0;n<t.length;n++)t[n].setAttribute("tabindex","-1")}expandAccordion(){this.expandTarget.style.height=this.cardBodyHeight+"px",this.expandTarget.setAttribute("aria-hidden","false"),this.querySelector(".accordion-card-header").classList.add("accordion-alpha-open"),this.querySelector(".accordion-card-container").classList.remove("collapsed"),this.activateButton.setAttribute("aria-expanded","true");let e=this.querySelectorAll(".accordion-card-container a"),t=this.querySelectorAll(".accordion-card-container button");for(var n=0;n<e.length;n++)e[n].removeAttribute("tabindex");for(n=0;n<t.length;n++)t[n].removeAttribute("tabindex")}}window.customElements.define("cagov-accordion",e);const t=document.createElement("style");t.textContent="/* accordion component specific classes */\ncagov-accordion .cagov-accordion-card {\n  border-radius: .3rem !important;\n  margin-bottom: 0;\n  min-height: 3rem;\n  margin-top: .5rem;\n  border: solid 1px #ededef !important;\n}\n\ncagov-accordion .accordion-card-container {\n  display: block;\n  overflow: hidden;\n}\n\ncagov-accordion button.accordion-card-header {\n  display: flex;\n  justify-content: left;\n  align-items: center;\n  padding: 0 0 0 1rem;\n  background-clip: border-box;\n  background-color: #EDEDEF;\n  border: none;\n  position: relative;\n  width: 100%;\n  line-height: 3rem;\n}\ncagov-accordion .accordion-title {\n  text-align: left;\n  margin-bottom: 0;\n  color: var(--primary-color, #064E66);\n  margin-right: auto;\n  width: 90%;\n  padding: 0 0.5rem 0 0 !important;\n  font-size: 1.125rem;\n  font-weight: bold;\n}\n\ncagov-accordion.prog-enhanced .accordion-card-container {\n  height: 0px;\n  transition: height 0.3s ease;\n}\ncagov-accordion.prog-enhanced .accordion-card-container .card-body {\n  padding-left: 1rem;\n}\n\ncagov-accordion .collapsed {\n  display: block;\n  overflow: hidden;\n  visibility: hidden;\n}\n\n.accordion-title h4,\n.accordion-title h3,\n.accordion-title h2 {\n  padding: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  font-size: 1.2rem !important;\n  font-weight: 700;\n  color: var(--primary-color, #064E66);\n  text-align: left !important;\n}\n\nbutton.accordion-card-header:hover {\n  background-color: var(--hover-color, #F9F9FA);\n}\nbutton.accordion-card-header:hover .accordion-title {\n  text-decoration: underline;\n}\nbutton.accordion-card-header:focus {\n  outline-offset: -2px;\n}\n\n.accordion-icon svg line {\n  stroke-width: 4px;  \n}\n\n.prog-enhanced .accordion-alpha .plus-minus {\n  width: 2.125rem;\n  height: 2.125rem;\n  border: none;\n  overflow: hidden;\n  margin-left: 1rem;\n  color: var(--primary-color, #064E66);\n  align-self: flex-start;\n}\n.prog-enhanced .accordion-alpha .plus-minus svg {\n  fill: var(--primary-color, #064E66);\n  width: 25px;\n  height: 25px;\n}\n\n.prog-enhanced .accordion-alpha-open cagov-plus .accordion-icon {\n  display: none !important;\n}\n.prog-enhanced .accordion-alpha-open cagov-minus .accordion-icon {\n  display: block !important;\n}\n\n@media only screen and (max-width: 767px) {\n  .accordion-alpha-open + .accordion-card-container {\n    height: 100% !important;\n  }\n}\n\n/*# sourceMappingURL=index.css.map */\n",document.querySelector("head").appendChild(t);class n extends window.HTMLElement{constructor(){if(super(),document.querySelector("api-viewer")){let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href","./src/css/index.css"),document.querySelector("api-viewer").shadowRoot.appendChild(e)}}connectedCallback(){let e=this.dataset.question?this.dataset.question:"Did you find what you were looking for?",t=this.dataset.yes?this.dataset.yes:"Yes",n=this.dataset.no?this.dataset.no:"No",a=this.dataset.commentPrompt?this.dataset.commentPrompt:"What was the problem?";this.positiveCommentPrompt=this.dataset.positiveCommentPrompt?this.dataset.positiveCommentPrompt:"Great! What were you looking for today?";let i=this.dataset.thanksFeedback?this.dataset.thanksFeedback:"Thank you for your feedback!",o=this.dataset.thanksComments?this.dataset.thanksComments:"Thank you for your comments!",s=this.dataset.submit?this.dataset.submit:"Submit";!this.dataset.characterLimit||this.dataset.characterLimit,!this.dataset.anythingToAdd||this.dataset.anythingToAdd,!this.dataset.anyOtherFeedback||this.dataset.anyOtherFeedback,this.endpointUrl=this.dataset.endpointUrl;let r=function(e,t,n,a,i,o,s){return`\n  <section aria-label="feedback">\n  <div class="feedback-form cagov-stack">\n    <div class="js-feedback-form feedback-form-question">\n      <h2 class="feedback-form-label" id="feedback-rating">${e}</h2>\n      <button class="feedback-form-button js-feedback-yes feedback-yes" id="feedback-yes">${t}</button>\n      <button class="feedback-form-button js-feedback-no" id="feedback-no">${n}</button>\n    </div>\n          \n    <div class="feedback-form-thanks js-feedback-thanks" role="alert">${i}</div>\n          \n    <div class="feedback-form-add">\n      <label class="feedback-form-label js-feedback-field-label" for="add-feedback">${a}</label>\n      <div class="feedback-form-add-grid">\n        <textarea name="add-feedback" class="js-add-feedback feedback-form-textarea" id="add-feedback" rows="1"></textarea>\n        <button class="feedback-form-button js-feedback-submit" type="submit" id="feedback-submit">${s}</button>\n      </div>\n    </div>\n\n    <div class="feedback-form-thanks feedback-thanks-add" role="alert">${o}</div>\n  </div>\n  </section>`}(e,t,n,a,i,o,s);this.innerHTML=r,this.applyListeners()}applyListeners(){this.wasHelpful="",this.querySelector(".js-add-feedback").addEventListener("focus",(e=>{this.querySelector(".js-feedback-submit").style.display="block"}));let e=this.querySelector(".js-add-feedback");e.addEventListener("keyup",(function(t){e.value.length>15?e.setAttribute("rows","3"):e.setAttribute("rows","1")})),e.addEventListener("blur",(t=>{0!==e.value.length&&(this.querySelector(".js-feedback-submit").style.display="block")})),this.querySelector(".js-feedback-yes").addEventListener("click",(e=>{this.querySelector(".js-feedback-field-label").innerHTML=this.positiveCommentPrompt,this.querySelector(".js-feedback-form").style.display="none",this.querySelector(".feedback-form-add").style.display="block",this.wasHelpful="yes",this.dispatchEvent(new CustomEvent("ratedPage",{detail:this.wasHelpful}))})),this.querySelector(".js-feedback-no").addEventListener("click",(e=>{this.querySelector(".js-feedback-form").style.display="none",this.querySelector(".feedback-form-add").style.display="block",this.wasHelpful="no",this.dispatchEvent(new CustomEvent("ratedPage",{detail:this.wasHelpful}))})),this.querySelector(".js-feedback-submit").addEventListener("click",(t=>{this.querySelector(".feedback-form-add").style.display="none",this.querySelector(".feedback-thanks-add").style.display="block";let n={};n.url=window.location.href,n.helpful=this.wasHelpful,n.comments=e.value,n.userAgent=navigator.userAgent,fetch(this.endpointUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((e=>e.json())).then((e=>console.log(e)))}))}}window.customElements.define("cagov-feedback",n);const a=document.createElement("style");a.textContent='cagov-feedback {\n  width: 100%;\n}\ncagov-feedback .feedback-form {\n  background: var(--standout-color, #2F4C2C);\n  padding: 1rem;\n  border-radius: 0.3125rem;\n}\ncagov-feedback .feedback-form-question {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n}\ncagov-feedback .feedback-form-label {\n  color: #fff;\n  font-size: 1.125rem;\n  display: block;\n  margin-right: 1rem;\n  transition: 0.3s color cubic-bezier(0.57, 0.2, 0.21, 0.89);\n  line-height: 3rem;\n  width: 100%;\n}\n@media (min-width: 48rem) {\n  cagov-feedback .feedback-form-label {\n    width: auto;\n  }\n}\ncagov-feedback .feedback-form-button {\n  padding: 1rem;\n  color: var(--standout-color, #2F4C2C);\n  border: none;\n  border-radius: 0.3rem;\n  transition: 0.3s background cubic-bezier(0.57, 0.2, 0.21, 0.89);\n  cursor: pointer;\n  margin: 0 0.5rem 0 0;\n  display: inline !important;\n  /* defensive overrides */\n  position: relative;\n  text-transform: none;\n  top: auto;\n  right: auto;\n  background: #fff;\n}\ncagov-feedback .feedback-form-button:hover {\n  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);\n  text-decoration: underline;\n}\ncagov-feedback .feedback-form-button:focus {\n  box-shadow: 0 0 0 2px #fff;\n}\ncagov-feedback .feedback-form-button .feedback-yes {\n  margin-right: 1rem;\n}\ncagov-feedback .feedback-form-add {\n  padding-top: 2rem;\n  display: none;\n}\n@media (min-width: 48rem) {\n  cagov-feedback .feedback-form-add {\n    text-align: left;\n    padding-top: 0;\n  }\n}\ncagov-feedback .feedback-form-add-grid {\n  position: relative;\n  margin-top: 1rem;\n}\n@media (min-width: 48rem) {\n  cagov-feedback .feedback-form-add-grid {\n    display: inline-flex;\n    flex-flow: column;\n    align-items: flex-start;\n  }\n}\ncagov-feedback .feedback-form-textarea {\n  width: 100%;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  font-family: "Roboto", sans-serif;\n  color: darkblue;\n  max-width: 90%;\n  height: 127px;\n  width: 600px;\n}\ncagov-feedback .feedback-form-thanks {\n  display: none;\n  color: #fff;\n}\ncagov-feedback .feedback-form-error {\n  position: relative;\n  top: 100%;\n  left: 0;\n  display: none;\n  font-weight: 300;\n  text-align: left;\n}\n\n/*# sourceMappingURL=index.css.map */\n',document.querySelector("head").appendChild(a);class i extends window.HTMLElement{connectedCallback(){this.innerHTML='<div class="accordion-icon" aria-hidden="true">\n        <svg viewbox="0 0 25 25">\n            <title>Minus</title>\n            <line x1="6" y1="12.5" x2="19" y2="12.5"  fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />\n        </svg>\n      </div>'}}function o(e,t){return`<li class="cagov-pagination__item">\n    <a\n      href="javascript:void(0);"\n      class="cagov-pagination__button"\n      aria-label="${e} ${t}"\n      data-page-num="${t}"\n    >\n      ${t}\n    </a>\n  </li>`}window.customElements.define("cagov-minus",i);class s extends window.HTMLElement{constructor(){if(super(),document.querySelector("api-viewer")){let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href","./src/css/index.css"),document.querySelector("api-viewer").shadowRoot.appendChild(e)}}connectedCallback(){this.currentPage=parseInt(this.dataset.currentPage?this.dataset.currentPage:"1"),this.render()}render(){let e=this.dataset.previous?this.dataset.previous:"&#60;",t=this.dataset.next?this.dataset.next:"&#62;",n=this.dataset.page?this.dataset.page:"Page";this.totalPages=this.dataset.totalPages?this.dataset.totalPages:"1";let a=function(e,t,n,a,i){return`<nav aria-label="Pagination" class="cagov-pagination">\n    <ul class="cagov-pagination__list">\n      <li class="cagov-pagination__item">\n        <a\n          href="javascript:void(0);"\n          class="cagov-pagination__link cagov-pagination__previous-page"\n          aria-label="${t} ${n}"\n        >\n          <span class="cagov-pagination__link-text ${a>2?"":"cagov-pagination__link-inactive"}"> ${t} </span>\n        </a>\n      </li>\n      ${a>2?o(n,1):""}\n\n      ${a>3?'<li\n    class="cagov-pagination__item cagov-pagination__overflow"\n    role="presentation"\n  >\n    <span> … </span>\n  </li>':""}\n\n      ${a>1?o(n,a-1):""}\n\n      <li class="cagov-pagination__item cagov-pagination-current">\n        <a\n          href="javascript:void(0);"\n          class="cagov-pagination__button"\n          aria-label="Page ${a}"\n          aria-current="page"\n          data-page-num="${a}"\n        >\n          ${a}\n        </a>\n      </li>\n\n      ${a<i?o(n,a+1):""}\n\n      ${a<i-3?'<li\n    class="cagov-pagination__item cagov-pagination__overflow"\n    role="presentation"\n  >\n    <span> … </span>\n  </li>':""}\n\n      ${a<i-1?o(n,i):""}\n\n      <li class="cagov-pagination__item">\n        <a\n          href="javascript:void(0);"\n          class="cagov-pagination__link cagov-pagination__next-page"\n          aria-label="${e} ${n}"\n        >\n          <span class="cagov-pagination__link-text ${a>i-1?"cagov-pagination__link-inactive":""}"> ${e} </span>\n        </a>\n      </li>\n    </ul>\n  </nav>`}(t,e,n,this.currentPage,this.totalPages);this.innerHTML=a,this.applyListeners()}static get observedAttributes(){return["data-current-page","data-total-pages"]}attributeChangedCallback(e,t,n){"data-current-page"===e&&(this.currentPage=parseInt(n),this.render())}applyListeners(){this.querySelectorAll(".cagov-pagination__button").forEach(function(e){e.addEventListener("click",(e=>{this.currentPage=parseInt(e.target.dataset.pageNum),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage}))}.bind(this)),this.querySelector(".cagov-pagination__previous-page").addEventListener("click",(e=>{e.target.classList.contains("cagov-pagination__link-inactive")||(this.currentPage--,this.currentPage<1&&(this.currentPage=1),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage)})),this.querySelector(".cagov-pagination__next-page").addEventListener("click",(e=>{e.target.classList.contains("cagov-pagination__link-inactive")||(this.currentPage++,this.currentPage>this.totalPages&&(this.currentPage=this.totalPages),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage)}))}}window.customElements.define("cagov-pagination",s);const r=document.createElement("style");r.textContent="cagov-pagination .cagov-pagination__list {\n  list-style: none;\n  margin: 0;\n  padding: 0 !important;\n  display: flex;\n}\ncagov-pagination .cagov-pagination__item {\n  border: 1px solid #EDEDEF;\n  border-radius: 0.3rem;\n  margin: 0.25rem;\n}\ncagov-pagination .cagov-pagination__item a {\n  padding: 0.75rem 0.875rem;\n  display: inline-block;\n  color: var(--primary-color, #064E66);\n  text-decoration: none;\n}\ncagov-pagination .cagov-pagination__item:hover {\n  background: #F9F9FA;\n}\ncagov-pagination .cagov-pagination__item:hover a {\n  text-decoration: underline;\n}\ncagov-pagination .cagov-pagination__item.cagov-pagination-current {\n  background-color: #064E66;\n  background-color: var(--primary-color, #064E66);\n}\ncagov-pagination .cagov-pagination__item.cagov-pagination-current a {\n  color: #fff;\n}\ncagov-pagination .cagov-pagination__item.cagov-pagination__overflow {\n  border: none;\n  padding: 0.875rem 0;\n}\ncagov-pagination .cagov-pagination__item.cagov-pagination__overflow:hover {\n  background: inherit;\n}\ncagov-pagination .cagov-pagination__link-inactive {\n  color: grey;\n  border-color: grey;\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n/*# sourceMappingURL=index.css.map */\n",document.querySelector("head").appendChild(r);class l extends window.HTMLElement{connectedCallback(){this.innerHTML='<div class="accordion-icon" aria-hidden="true">\n        <svg viewbox="0 0 25 25">\n            <title>Plus</title>\n            <line x1="6" y1="12.5" x2="19" y2="12.5" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />\n            <line y1="6" x1="12.5" y2="19" x2="12.5" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />\n        </svg>\n      </div>'}}window.customElements.define("cagov-plus",l);class c extends window.HTMLElement{connectedCallback(){this.menuContentFile=this.dataset.json,this.querySelector(".open-menu").addEventListener("click",this.toggleMainMenu.bind(this)),this.expansionListeners(),document.addEventListener("keydown",this.escapeMainMenu.bind(this)),document.body.addEventListener("click",this.bodyClick.bind(this))}toggleMainMenu(){this.querySelector(".hamburger").classList.contains("is-active")?this.closeMainMenu():this.openMainMenu()}openMainMenu(){this.classList.add("display-menu"),this.querySelector(".hamburger").classList.add("is-active"),this.querySelector(".menu-trigger").classList.add("is-fixed");var e=this.querySelector(".menu-trigger-label");e.innerHTML=e.getAttribute("data-closelabel")}closeMainMenu(){this.classList.remove("display-menu"),this.classList.remove("reveal-items"),this.querySelector(".hamburger").classList.remove("is-active"),this.querySelector(".menu-trigger").classList.remove("is-fixed");var e=this.querySelector(".menu-trigger-label");e.innerHTML=e.getAttribute("data-openlabel")}escapeMainMenu(e){27===e.keyCode&&this.closeAllMenus()}bodyClick(e){e.target.closest("cagov-navoverlay")||this.closeAllMenus()}closeAllMenus(){this.querySelectorAll(".js-cagov-navoverlay-expandable").forEach((e=>{e.querySelector(".expanded-menu-section").classList.remove("expanded"),e.setAttribute("aria-expanded","false");let t=e.querySelector(".expanded-menu-dropdown");if(t){t.setAttribute("aria-hidden","true");let e=t.querySelectorAll("a");for(var n=0;n<e.length;n++)e[n].setAttribute("tabindex","-1")}}))}expansionListeners(){this.querySelectorAll(".js-cagov-navoverlay-expandable").forEach((e=>{const t=e.querySelector(".expanded-menu-section");if(t){const n=t.querySelector(".expanded-menu-dropdown");n&&(n.setAttribute("aria-hidden","true"),e.setAttribute("aria-expanded","false"))}let n=this;e.addEventListener("click",(function(e){let t=this.querySelector(".expanded-menu-section-header-link");if("A"===t.nodeName)window.location=t.href;else{e.preventDefault();let t=this.querySelector(".expanded-menu-section");if(t)if(t.classList.contains("expanded"))n.closeAllMenus();else{n.closeAllMenus(),t.classList.add("expanded"),this.setAttribute("aria-expanded","true");let e=this.querySelector(".expanded-menu-dropdown");if(e){e.setAttribute("aria-hidden","false");let t=e.querySelectorAll("a");for(var a=0;a<t.length;a++)t[a].removeAttribute("tabindex")}}}}))}))}}window.customElements.define("cagov-navoverlay",c);class d extends window.HTMLElement{connectedCallback(){this.type="wordpress",function(){function e(){var e=window,t=document;if(!("scrollBehavior"in t.documentElement.style)||!0===e.__forceSmoothScrollPolyfill__){var n,a=e.HTMLElement||e.Element,i=468,o={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,elementScroll:a.prototype.scroll||l,scrollIntoView:a.prototype.scrollIntoView},s=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now,r=(n=e.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(n)?1:0);e.scroll=e.scrollTo=function(){void 0!==arguments[0]&&(!0!==c(arguments[0])?p.call(e,t.body,void 0!==arguments[0].left?~~arguments[0].left:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:e.scrollY||e.pageYOffset):o.scroll.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:e.scrollY||e.pageYOffset))},e.scrollBy=function(){void 0!==arguments[0]&&(c(arguments[0])?o.scrollBy.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):p.call(e,t.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset)))},a.prototype.scroll=a.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==c(arguments[0])){var e=arguments[0].left,t=arguments[0].top;p.call(this,this,void 0===e?this.scrollLeft:~~e,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");o.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},a.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==c(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):o.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},a.prototype.scrollIntoView=function(){if(!0!==c(arguments[0])){var n=function(e){for(;e!==t.body&&!1===(a=d(n=e,"Y")&&h(n,"Y"),i=d(n,"X")&&h(n,"X"),a||i);)e=e.parentNode||e.host;var n,a,i;return e}(this),a=n.getBoundingClientRect(),i=this.getBoundingClientRect();n!==t.body?(p.call(this,n,n.scrollLeft+i.left-a.left,n.scrollTop+i.top-a.top),"fixed"!==e.getComputedStyle(n).position&&e.scrollBy({left:a.left,top:a.top,behavior:"smooth"})):e.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}else o.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function l(e,t){this.scrollLeft=e,this.scrollTop=t}function c(e){if(null===e||"object"!=typeof e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"==typeof e&&"smooth"===e.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+e.behavior+" is not a valid value for enumeration ScrollBehavior.")}function d(e,t){return"Y"===t?e.clientHeight+r<e.scrollHeight:"X"===t?e.clientWidth+r<e.scrollWidth:void 0}function h(t,n){var a=e.getComputedStyle(t,null)["overflow"+n];return"auto"===a||"scroll"===a}function u(t){var n,a,o,r,l=(s()-t.startTime)/i;r=l=l>1?1:l,n=.5*(1-Math.cos(Math.PI*r)),a=t.startX+(t.x-t.startX)*n,o=t.startY+(t.y-t.startY)*n,t.method.call(t.scrollable,a,o),a===t.x&&o===t.y||e.requestAnimationFrame(u.bind(e,t))}function p(n,a,i){var r,c,d,h,p=s();n===t.body?(r=e,c=e.scrollX||e.pageXOffset,d=e.scrollY||e.pageYOffset,h=o.scroll):(r=n,c=n.scrollLeft,d=n.scrollTop,h=l),u({scrollable:r,method:h,startTime:p,startX:c,startY:d,x:a,y:i})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:e}:e()}(),"wordpress"===this.type&&document.addEventListener("DOMContentLoaded",(()=>this.buildContentNavigation()))}buildContentNavigation(){let e=this.getHeaderTags(),t=null;null!==e&&(t=this.dataset.label||"On this page");let n=null;null!==e&&(n=`<div class="label">${t}</div> ${e}`),this.template({content:n},"wordpress")}template(e,t){return null!=e&&null!==e.content&&"wordpress"===t&&(this.innerHTML=`${e.content}`),document.querySelectorAll('a[href^="#"]').forEach((e=>{e.addEventListener("click",(function(t){let n=e.getAttribute("href");try{let e=document.querySelector(n);if(null!==e){let t=e.getBoundingClientRect();window.matchMedia("(prefers-reduced-motion)").matches||window.scrollTo({behavior:"smooth",left:t.left,top:t.top-200}),history.pushState(null,null,n)}}catch(e){console.error(e)}t.preventDefault()}))})),null}renderNoContent(){this.innerHTML=""}getHeaderTags(){let e=this.dataset.selector;this.dataset.editor,this.dataset.label,this.dataset.callback;for(var t=["h2"],n=0;n<t.length;n++)if(null!=e){let t=document.querySelector(e);if(null!==t){return this.outliner(t)}}return null}outliner(e){let t=e.querySelectorAll("h2"),n="";return null!=t&&t.length>0?(t.forEach((e=>{let t=e.getAttribute("id"),a=e.innerHTML,i=e.innerHTML.toLowerCase().trim().replace(/ /g,"-").replace(/\(|\)|\!|\"|\#|\$|\%|\&|\'|\*|\+|\,|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\]|\\|\^|\`|\{|\||\|\}|\~/g,"");null!=t&&(i=t),n+=`<li><a href="#${encodeURI(i)}">${a}</a></li>`,null==t&&(t=i,e.setAttribute("id",t))})),`<ul>${n}</ul>`):null}}void 0===customElements.get("cagov-content-navigation")&&window.customElements.define("cagov-content-navigation",d);class h extends window.HTMLElement{connectedCallback(){let e=window.location.origin;this.endpoint=this.dataset.endpoint||`${e}/wp-json/wp/v2`,this.order=this.dataset.order||"desc",this.count=this.dataset.count||"10",this.category=this.dataset.category||"announcements,press-releases",this.showExcerpt=this.dataset.showExcerpt||!0,this.noResults=this.dataset.noResults||"No results found",this.showPublishedDate=this.dataset.showPublishedDate||!0,this.showPagination="true"===this.dataset.showPagination,this.filter=this.dataset.filter?this.dataset.filter:"none",this.readMore=this.dataset.readMore||"",this.type=this.dataset.type||"wordpress",this.currentPage=1,this.categoryMap={},"wordpress"===this.type&&this.getWordpressPosts()}getWordpressPosts(){if(void 0!==this.endpoint){this.category.indexOf(",")>-1?this.category=this.category.split(","):this.category=[this.category];let e=`${this.endpoint}/categories?slug=${this.category}`;window.fetch(e).then((e=>e.json())).then(function(e){if(0===e.length)return this.renderNoPosts();let t=0;e.map((e=>{t+=e.count}));let n=e.map((e=>(this.categoryMap[e.id]=e,e.id))),a=`${this.endpoint}/posts?`;void 0!==n&&n.length>0&&(a+=`categories=${n.join(",")}`),this.count&&(a+=`&per_page=${this.count}`),this.order&&(a+=`&order=${this.order}`),this.currentPage&&(a+=`&page=${this.currentPage}`),"today-or-after"===this.filter||this.filter,window.fetch(a).then((e=>e.json())).then(function(e){void 0!==e&&(this.querySelector(".post-list-results")||(this.innerHTML='<div class="post-list-results"></div>',!0===this.showPagination&&(this.innerHTML=`<div class="post-list-results"></div><cagov-pagination data-current-page="${this.currentPage}" data-total-pages="${parseInt(t/this.count)}"></cagov-pagination>`)),this.querySelector(".post-list-results").innerHTML=this.template(e,"wordpress",t),null!==this.querySelector("cagov-pagination")&&this.querySelector("cagov-pagination").addEventListener("paginationClick",function(e){e.detail&&(this.currentPage=e.detail,this.getWordpressPosts())}.bind(this),!1))}.bind(this)).catch((e=>{console.error(e),this.renderNoPosts()}))}.bind(this)).catch((e=>{console.error(e),this.renderNoPosts()}))}}template(e,t){if(!(null!=e&&e.length>0))return`<div class="no-results">${this.noResults}</div>`;if("wordpress"===t){return`<div class="post-list-items">${e.map((e=>this.renderWordpressPostTitleDate(e))).join("")}</div>${this.readMore}`}return null}renderNoPosts(){this.innerHTML=`<div class="post-list-no-results">${this.noResults}</div>`}renderWordpressPostTitleDate({title:e=null,link:t=null,date:n=null,content:a=null,excerpt:i=null,author:o=null,featured_media:s=null,categories:r=null,format:l="standard",design_system_fields:c=null,headless:d=!1}){let h;if("link"===l&&null!==c&&void 0!==c.post&&void 0!==c.post.post_link&&null!==c.post.post_link&&""!==c.post.post_link&&(t=c.post.post_link),null!==n&&void 0!==window.moment&&void 0!==c.post)try{h=c.post.post_published_date_display.i18n_locale_date}catch(e){console.error(e)}let u="true"===this.showExcerpt?`<div class="excerpt"><p>${i.rendered}</p></div>`:"",p="true"===this.showPublishedDate?`<div class="date">${h}</div>`:"";"status"===l&&"true"===this.showExcerpt&&(u=`<div class="excerpt"><p>${a.rendered}</p></div>`);return"status"===l?`<div class="post-list-item post-status">\n          \n          <div class="link-title">\n            ${p}\n          </div>\n          ${u}\n          \n      </div>\n      `:`<div class="post-list-item">\n                \n                <div class="link-title"><a href="${t}">\n                    ${e.rendered}\n                </a></div>\n                ${u}\n                ${p}\n            </div>\n            `}}void 0===customElements.get("cagov-post-list")&&window.customElements.define("cagov-post-list",h);class u extends window.HTMLElement{connectedCallback(){this.type="wordpress",this.message=this.dataset.message||"",this.icon=this.dataset.icon||"","wordpress"===this.type&&document.addEventListener("DOMContentLoaded",(()=>{this.template({message:this.message,icon:this.icon},"wordpress"),document.querySelector("cagov-page-alert .close-button").addEventListener("click",(e=>{document.querySelector("cagov-page-alert").style.display="none"}))}))}template(e,t){return null!=e&&null!==e.content&&"wordpress"===t&&(this.innerHTML=`<div class="cagov-page-alert cagov-stack"><div class="icon"><span class="${this.icon}"></span></div>\n        <div class="body">${this.message}</div>\n        <div class="close-button"><span class="ca-gov-icon-close-line"></span></div></div>`),null}}void 0===customElements.get("cagov-page-alert")&&window.customElements.define("cagov-page-alert",u);class p extends window.HTMLElement{connectedCallback(){console.log("Loading Drought Map"),this.type="wordpress","wordpress"===this.type&&document.addEventListener("DOMContentLoaded",(()=>{this.template({},"wordpress")}))}template(e,t){return null!=e&&null!==e.content&&"wordpress"===t&&(this.innerHTML='<div class="cagov-drought-map">\n                <div class="map-label"><h2>Map released: July 15, 2021</h2></div>\n                <div class="drought-map-image"><a href="https://droughtmonitor.unl.edu/"><img src="/assets/img/usdm-assets/20210713_usdm_excerpt.png" /></a></div>\n                <div class="legend-label"><h2>Intensity</h2></div>\n                <div class="drought-map-legend">\n                    <div class="col-1">\n                        <div class="legend"><span class="intensity intensity-ldnone"> </span>None</div>\n                        <div class="legend"><span class="intensity intensity-ld0"> </span>D0 (Abnormally dry)</div>\n                        <div class="legend"><span class="intensity intensity-ld1"> </span>D1 (Moderate drought)</div>\n                    </div>\n                    <div class="col-2">\n                        <div class="legend"><span class="intensity intensity-ld2"> </span>D2 (Severe drought)</div>\n                        <div class="legend"><span class="intensity intensity-ld3"> </span>D3 (Extreme drought)</div>\n                        <div class="legend"><span class="intensity intensity-ld4"> </span>D4 (Exceptional drought)</div>\n                    </div>\n                    <div class="col-3">\n                        <div class="legend"><span class="intensity intensity-ldnodata"> </span>No data</div>\n                    </div>\n                </div>\n                <div class="map-link"><a href="https://droughtmonitor.unl.edu/">View details on US Drought Monitor</a></div>\n                </div>'),null}}function g(e,t,n="click"){"undefined"!=typeof ga?(ga("send","event",n,e,t),ga("tracker2.send","event",n,e,t)):setTimeout((function(){g(e,t,n)}),500)}void 0===customElements.get("cagov-drought-map")&&window.customElements.define("cagov-drought-map",p),window.onload=e=>{console.log("Setting up analytics"),document.querySelectorAll("cagov-accordion").forEach((e=>{e.addEventListener("click",(function(){this.querySelector(".accordion-title")&&g("accordion",this.querySelector(".accordion-title").textContent.trim())}))})),document.querySelectorAll("a").forEach((e=>{e.href.indexOf(window.location.hostname)>-1||e.href.indexOf("drought.ca.gov")>-1?e.href.indexOf(".pdf")>-1&&e.addEventListener("click",(function(){g("pdf",this.href.split(window.location.hostname)[1])})):e.addEventListener("click",(function(){g("offsite",this.href)}))}))};
