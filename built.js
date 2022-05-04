var At=`/* accordion component specific classes */
cagov-accordion .cagov-accordion-card {
  border-radius: 0.3rem !important;
  margin-bottom: 0;
  min-height: 3rem;
  margin-top: 0.5rem;
  border: solid 1px #ededef !important;
}

cagov-accordion .accordion-card-container {
  display: block;
  overflow: hidden;
}

cagov-accordion button.accordion-card-header {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 0 0 1rem;
  background-clip: border-box;
  background-color: #ededef;
  border: none;
  position: relative;
  width: 100%;
  line-height: 3rem;
}

cagov-accordion.prog-enhanced button.accordion-card-header {
  cursor: pointer;
}

cagov-accordion .accordion-title {
  text-align: left;
  margin-bottom: 0;
  color: var(--primary-color, #064e66);
  margin-right: auto;
  width: 90%;
  padding: 0 0.5rem 0 0 !important;
  font-size: 1.125rem;
  font-weight: bold;
}

cagov-accordion.prog-enhanced .accordion-card-container {
  height: 0px;
  transition: height 0.3s ease;
}

cagov-accordion.prog-enhanced .accordion-card-container .card-body {
  padding-left: 1rem;
  margin-top: 8px;
}

cagov-accordion.prog-enhanced .accordion-card-container .card-body ul {
  margin-left: 16px;
  margin-right: 16px;
}

cagov-accordion .collapsed {
  display: block;
  overflow: hidden;
  visibility: hidden;
}

.accordion-title h4,
.accordion-title h3,
.accordion-title h2 {
  padding: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  font-size: 1.2rem !important;
  font-weight: 700;
  color: var(--primary-color, #064e66);
  text-align: left !important;
}

button.accordion-card-header:hover {
  background-color: var(--hover-color, #f9f9fa);
}

button.accordion-card-header:hover .accordion-title {
  text-decoration: underline;
}

button.accordion-card-header:hover .accordion-title:hover {
  text-decoration: underline;
}

button.accordion-card-header:focus {
  outline-offset: -2px;
}

.accordion-icon svg line {
  stroke-width: 4px;
}

cagov-accordion.prog-enhanced .accordion-alpha .plus-minus {
  width: 2.125rem;
  height: 2.125rem;
  border: none;
  overflow: hidden;
  margin-left: 1rem;
  color: var(--primary-color, #064e66);
  align-self: flex-start;
  margin-top: 8px;
}

.prog-enhanced .accordion-alpha .plus-minus svg {
  fill: var(--primary-color, #064e66);
  width: 25px;
  height: 25px;
}

.prog-enhanced .accordion-alpha-open cagov-plus .accordion-icon {
  display: none !important;
}

.prog-enhanced .accordion-alpha-open cagov-minus .accordion-icon {
  display: block !important;
}

@media only screen and (max-width: 767px) {
  .accordion-alpha-open + .accordion-card-container {
    height: 100% !important;
  }
}

/*# sourceMappingURL=index.css.map */
`,X=class extends window.HTMLElement{connectedCallback(){if(this.classList.add("prog-enhanced"),this.expandTarget=this.querySelector(".accordion-card-container"),this.expandButton=this.querySelector(".accordion-card-header"),this.expandButton&&this.expandButton.addEventListener("click",this.listen.bind(this)),this.activateButton=this.querySelector(".accordion-card-header"),this.eventType=this.dataset.eventType?this.dataset.eventType:"click",this.activateButton.getAttribute("aria-expanded")==="true"){this.triggerAccordionClick();let t=this.querySelectorAll(".accordion-card-container a"),n=this.querySelectorAll(".accordion-card-container button");for(let e=0;e<t.length;e+=1)t[e].removeAttribute("tabindex");for(let e=0;e<n.length;e+=1)n[e].removeAttribute("tabindex")}else{let t=this.querySelectorAll(".accordion-card-container a"),n=this.querySelectorAll(".accordion-card-container button");for(let e=0;e<t.length;e+=1)t[e].setAttribute("tabindex","-1");for(let e=0;e<n.length;e+=1)n[e].setAttribute("tabindex","-1")}}listen(){this.cardBodyHeight||(this.cardBodyHeight=this.querySelector(".card-body").clientHeight+24),this.expandTarget.clientHeight>0?this.closeAccordion():this.expandAccordion()}triggerAccordionClick(){let a=new MouseEvent(this.eventType,{view:window,bubbles:!0,cancelable:!0});this.expandButton.dispatchEvent(a)}closeAccordion(){this.expandTarget.style.height="0px",this.expandTarget.setAttribute("aria-hidden","true"),this.querySelector(".accordion-card-header").classList.remove("accordion-alpha-open"),this.activateButton.setAttribute("aria-expanded","false");let a=this.querySelectorAll(".accordion-card-container a"),t=this.querySelectorAll(".accordion-card-container button");for(let n=0;n<a.length;n+=1)a[n].setAttribute("tabindex","-1");for(let n=0;n<t.length;n+=1)t[n].setAttribute("tabindex","-1")}expandAccordion(){this.expandTarget.style.height=`${this.cardBodyHeight}px`,this.expandTarget.setAttribute("aria-hidden","false"),this.querySelector(".accordion-card-header").classList.add("accordion-alpha-open"),this.querySelector(".accordion-card-container").classList.remove("collapsed"),this.activateButton.setAttribute("aria-expanded","true");let a=this.querySelectorAll(".accordion-card-container a"),t=this.querySelectorAll(".accordion-card-container button");for(let n=0;n<a.length;n+=1)a[n].removeAttribute("tabindex");for(let n=0;n<t.length;n+=1)t[n].removeAttribute("tabindex")}};window.customElements.define("cagov-accordion",X);var W=document.createElement("style");W.textContent=At;document.querySelector("head").appendChild(W);function ft(r,a,t,n,e,o,i){return`
  <section aria-label="feedback">
  <div class="feedback-form cagov-stack">
    <div class="js-feedback-form feedback-form-question">
      <h2 class="feedback-form-label" id="feedback-rating">${r}</h2>
      <button class="feedback-form-button js-feedback-yes feedback-yes" id="feedback-yes">${a}</button>
      <button class="feedback-form-button js-feedback-no" id="feedback-no">${t}</button>
    </div>
          
    <div class="feedback-form-thanks js-feedback-thanks" role="alert">${e}</div>
          
    <div class="feedback-form-add">
      <label class="feedback-form-label js-feedback-field-label" for="add-feedback">${n}</label>
      <div class="feedback-form-add-grid">
        <textarea name="add-feedback" class="js-add-feedback feedback-form-textarea" id="add-feedback" rows="1"></textarea>
        <button class="feedback-form-button js-feedback-submit" type="submit" id="feedback-submit">${i}</button>
      </div>
    </div>

    <div class="feedback-form-thanks feedback-thanks-add" role="alert">${o}</div>
  </div>
  </section>`}var bt=`cagov-feedback {
  width: 100%;
}
cagov-feedback .feedback-form {
  background: var(--primary-dark-color, #003484);
  padding: 1rem;
  border-radius: 0.3125rem;
  max-width: var(--w-lg, 1176px);
  margin: 0 auto;
}
cagov-feedback .feedback-form-question {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
cagov-feedback .feedback-form-label {
  color: #fff;
  background-color: var(--primary-dark-color, #003484);
  font-size: 1.125rem;
  display: block;
  margin-right: 1rem;
  transition: 0.3s color cubic-bezier(0.57, 0.2, 0.21, 0.89);
  line-height: 3rem;
  width: auto;
}
@media (max-width: 768px) {
  cagov-feedback .feedback-form-label {
    line-height: unset;
    margin-bottom: 1rem;
  }
}
cagov-feedback .feedback-form-button {
  padding: 1rem;
  color: var(--primary-dark-color, #003484);
  border: none;
  border-radius: 0.3rem;
  transition: 0.3s background cubic-bezier(0.57, 0.2, 0.21, 0.89);
  cursor: pointer;
  margin: 0 0.5rem 0 0;
  display: inline !important;
  /* defensive overrides */
  position: relative;
  text-transform: none;
  top: auto;
  right: auto;
  background: #fff;
}
cagov-feedback .feedback-form-button:hover {
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
  text-decoration: underline;
}
cagov-feedback .feedback-form-button:focus {
  box-shadow: 0 0 0 2px #fff;
}
cagov-feedback .feedback-form-button .feedback-yes {
  margin-right: 1rem;
}
cagov-feedback .feedback-form-add {
  padding-top: 0;
  display: none;
}
@media (max-width: 768px) {
  cagov-feedback .feedback-form-add {
    text-align: left;
    padding-top: 0;
  }
}
cagov-feedback .feedback-form-add-grid {
  position: relative;
  margin-top: 1rem;
  display: inline-flex;
  flex-flow: column;
  align-items: flex-start;
}
@media (max-width: 768px) {
  cagov-feedback .feedback-form-add-grid {
    display: block;
  }
}
cagov-feedback .feedback-form-textarea {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  font-family: "Roboto", sans-serif;
  color: var(--primary-dark-color, #003484);
  max-width: 90%;
  height: 127px;
  width: 600px;
}
cagov-feedback .feedback-form-thanks {
  display: none;
  color: #fff;
}
cagov-feedback .feedback-form-error {
  position: relative;
  top: 100%;
  left: 0;
  display: none;
  font-weight: 300;
  text-align: left;
}

/*# sourceMappingURL=index.css.map */
`,G=class extends window.HTMLElement{connectedCallback(){let a=this.dataset.question?this.dataset.question:"Did you find what you were looking for?",t=this.dataset.yes?this.dataset.yes:"Yes",n=this.dataset.no?this.dataset.no:"No",e=this.dataset.commentPrompt?this.dataset.commentPrompt:"What was the problem?";this.positiveCommentPrompt=this.dataset.positiveCommentPrompt?this.dataset.positiveCommentPrompt:"Great! What were you looking for today?";let o=this.dataset.thanksFeedback?this.dataset.thanksFeedback:"Thank you for your feedback!",i=this.dataset.thanksComments?this.dataset.thanksComments:"Thank you for your comments!",s=this.dataset.submit?this.dataset.submit:"Submit";this.dataset.characterLimit&&this.dataset.characterLimit,this.dataset.anythingToAdd&&this.dataset.anythingToAdd,this.dataset.anyOtherFeedback&&this.dataset.anyOtherFeedback,this.endpointUrl=this.dataset.endpointUrl;let m=ft(a,t,n,e,o,i,s);this.innerHTML=m,this.applyListeners()}applyListeners(){this.wasHelpful="",this.querySelector(".js-add-feedback").addEventListener("focus",()=>{this.querySelector(".js-feedback-submit").style.display="block"});let a=this.querySelector(".js-add-feedback");a.addEventListener("keyup",()=>{a.value.length>15?a.setAttribute("rows","3"):a.setAttribute("rows","1")}),a.addEventListener("blur",()=>{a.value.length!==0&&(this.querySelector(".js-feedback-submit").style.display="block")}),this.querySelector(".js-feedback-yes").addEventListener("click",()=>{this.querySelector(".js-feedback-field-label").innerHTML=this.positiveCommentPrompt,this.querySelector(".js-feedback-form").style.display="none",this.querySelector(".feedback-form-add").style.display="block",this.wasHelpful="yes",this.dispatchEvent(new CustomEvent("ratedPage",{detail:this.wasHelpful}))}),this.querySelector(".js-feedback-no").addEventListener("click",()=>{this.querySelector(".js-feedback-form").style.display="none",this.querySelector(".feedback-form-add").style.display="block",this.wasHelpful="no",this.dispatchEvent(new CustomEvent("ratedPage",{detail:this.wasHelpful}))}),this.querySelector(".js-feedback-submit").addEventListener("click",()=>{this.querySelector(".feedback-form-add").style.display="none",this.querySelector(".feedback-thanks-add").style.display="block";let t={};t.url=window.location.href,t.helpful=this.wasHelpful,t.comments=a.value,t.userAgent=navigator.userAgent,fetch(this.endpointUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(n=>n.json()).then(n=>console.log(n))})}};window.customElements.define("cagov-feedback",G);var J=document.createElement("style");J.textContent=bt;document.querySelector("head").appendChild(J);var K=class extends window.HTMLElement{connectedCallback(){this.innerHTML=`<div class="accordion-icon" aria-hidden="true">
        <svg viewbox="0 0 25 25">
            <title>Minus</title>
            <line x1="6" y1="12.5" x2="19" y2="12.5"  fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />
        </svg>
      </div>`}};window.customElements.define("cagov-minus",K);function B(r,a){return`<li class="cagov-pagination__item">
    <a
      href="javascript:void(0);"
      class="cagov-pagination__button"
      aria-label="${r} ${a}"
      data-page-num="${a}"
    >
      ${a}
    </a>
  </li>`}function Z(){return`<li
    class="cagov-pagination__item cagov-pagination__overflow"
    role="presentation"
  >
    <span> \u2026 </span>
  </li>`}function xt(r,a,t,n,e){return`<nav aria-label="Pagination" class="cagov-pagination">
    <ul class="cagov-pagination__list">
      <li class="cagov-pagination__item">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__link cagov-pagination__previous-page"
          aria-label="${a} ${t}"
        >
          <span class="cagov-pagination__link-text ${n>2?"":"cagov-pagination__link-inactive"}"> ${a} </span>
        </a>
      </li>
      ${n>2?B(t,1):""}

      ${n>3?Z():""}

      ${n>1?B(t,n-1):""}

      <li class="cagov-pagination__item cagov-pagination-current">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__button"
          aria-label="Page ${n}"
          aria-current="page"
          data-page-num="${n}"
        >
          ${n}
        </a>
      </li>

      ${n<e?B(t,n+1):""}

      ${n<e-3?Z():""}

      ${n<e-1?B(t,e):""}

      <li class="cagov-pagination__item">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__link cagov-pagination__next-page"
          aria-label="${r} ${t}"
        >
          <span class="cagov-pagination__link-text ${n>e-1?"cagov-pagination__link-inactive":""}"> ${r} </span>
        </a>
      </li>
    </ul>
  </nav>`}var kt=`cagov-pagination .cagov-pagination__list {
  list-style: none;
  margin: 0;
  padding: 0 !important;
  display: flex;
}
cagov-pagination .cagov-pagination__item {
  border: 1px solid #EDEDEF;
  border-radius: 0.3rem;
  margin: 0.25rem;
}
cagov-pagination .cagov-pagination__item a {
  padding: 0.75rem 0.875rem;
  display: inline-block;
  color: var(--primary-color, #064E66);
  text-decoration: none;
}
cagov-pagination .cagov-pagination__item:hover {
  background: #F9F9FA;
}
cagov-pagination .cagov-pagination__item:hover a {
  text-decoration: underline;
}
cagov-pagination .cagov-pagination__item.cagov-pagination-current {
  background-color: #064E66;
  background-color: var(--primary-color, #064E66);
}
cagov-pagination .cagov-pagination__item.cagov-pagination-current a {
  color: #fff;
}
cagov-pagination .cagov-pagination__item.cagov-pagination__overflow {
  border: none;
  padding: 0.875rem 0;
}
cagov-pagination .cagov-pagination__item.cagov-pagination__overflow:hover {
  background: inherit;
}
cagov-pagination .cagov-pagination__link-inactive {
  color: grey;
  border-color: grey;
  cursor: not-allowed;
  opacity: 0.5;
}

/*# sourceMappingURL=index.css.map */
`,Q=class extends window.HTMLElement{connectedCallback(){this.currentPage=parseInt(this.dataset.currentPage?this.dataset.currentPage:"1",10),this.render()}render(){let a=this.dataset.previous?this.dataset.previous:"&#60;",t=this.dataset.next?this.dataset.next:"&#62;",n=this.dataset.page?this.dataset.page:"Page";this.totalPages=this.dataset.totalPages?this.dataset.totalPages:"1";let e=xt(t,a,n,this.currentPage,this.totalPages);this.innerHTML=e,this.applyListeners()}static get observedAttributes(){return["data-current-page","data-total-pages"]}attributeChangedCallback(a,t,n){a==="data-current-page"&&(this.currentPage=parseInt(n,10),this.render())}applyListeners(){this.querySelectorAll(".cagov-pagination__button").forEach(t=>{t.addEventListener("click",n=>{this.currentPage=parseInt(n.target.dataset.pageNum,10),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage})}),this.querySelector(".cagov-pagination__previous-page").addEventListener("click",t=>{t.target.classList.contains("cagov-pagination__link-inactive")||(this.currentPage-=1,this.currentPage<1&&(this.currentPage=1),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage)}),this.querySelector(".cagov-pagination__next-page").addEventListener("click",t=>{t.target.classList.contains("cagov-pagination__link-inactive")||(this.currentPage+=1,this.currentPage>this.totalPages&&(this.currentPage=this.totalPages),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage)})}};window.customElements.define("cagov-pagination",Q);var tt=document.createElement("style");tt.textContent=kt;document.querySelector("head").appendChild(tt);var at=class extends window.HTMLElement{connectedCallback(){this.innerHTML=`<div class="accordion-icon" aria-hidden="true">
        <svg viewbox="0 0 25 25">
            <title>Plus</title>
            <line x1="6" y1="12.5" x2="19" y2="12.5" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />
            <line y1="6" x1="12.5" y2="19" x2="12.5" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke" />
        </svg>
      </div>`}};window.customElements.define("cagov-plus",at);function Dt(){let r=document.querySelector(".branding .grid-mobile-icons");return r?getComputedStyle(r).display!=="none":!1}var nt=class extends window.HTMLElement{connectedCallback(){document.querySelector(".cagov-nav.open-menu").addEventListener("click",this.toggleMainMenu.bind(this));let a=document.querySelector(".cagov-nav.mobile-search .search-btn");a&&(a.setAttribute("aria-expanded","false"),document.querySelector(".search-container--small .site-search input").setAttribute("tabindex","-1"),document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex","-1"),document.querySelector(".search-container--small").setAttribute("aria-hidden","true"),Dt()&&a.addEventListener("click",()=>{document.querySelector(".search-container--small").classList.toggle("hidden-search"),document.querySelector(".search-container--small").classList.contains("hidden-search")?(a.setAttribute("aria-expanded","false"),document.querySelector(".search-container--small .site-search input").setAttribute("tabindex","-1"),document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex","-1"),document.querySelector(".search-container--small").setAttribute("aria-hidden","true")):(a.setAttribute("aria-expanded","true"),document.querySelector(".search-container--small .site-search input").focus(),document.querySelector(".search-container--small .site-search input").removeAttribute("tabindex"),document.querySelector(".search-container--small .site-search button.search-submit").removeAttribute("tabindex"),document.querySelector(".search-container--small").setAttribute("aria-hidden","false"))})),window.addEventListener("resize",()=>{document.querySelector(".search-container--small").classList.add("hidden-search"),a&&document.querySelector(".cagov-nav.mobile-search .search-btn").setAttribute("aria-expanded","false"),document.querySelector(".search-container--small .site-search input").setAttribute("tabindex","-1"),document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex","-1"),document.querySelector(".search-container--small").setAttribute("aria-hidden","true")}),this.expansionListeners(),document.addEventListener("keydown",this.escapeMainMenu.bind(this)),document.body.addEventListener("click",this.bodyClick.bind(this)),this.highlightCurrentPage()}toggleMainMenu(){document.querySelector(".cagov-nav.hamburger").classList.contains("is-active")?this.closeMainMenu():this.openMainMenu()}highlightCurrentPage(){this.querySelectorAll("a.expanded-menu-dropdown-link").forEach(a=>{a.href===window.location.href&&a.classList.add("current-page-highlight")})}openMainMenu(){document.querySelector(".mobile-icons").classList.add("display-menu"),this.classList.add("display-menu"),document.querySelector(".cagov-nav.hamburger").classList.add("is-active"),document.querySelector(".cagov-nav.menu-trigger").classList.add("is-fixed"),document.querySelector(".cagov-nav.menu-trigger").setAttribute("aria-expanded","true");let a=document.querySelector(".cagov-nav.menu-trigger-label");a.innerHTML=a.getAttribute("data-closelabel")}closeMainMenu(){document.querySelector(".mobile-icons").classList.remove("display-menu"),this.classList.remove("display-menu"),document.querySelector(".cagov-nav.hamburger").classList.remove("is-active"),document.querySelector(".cagov-nav.menu-trigger").classList.remove("is-fixed"),document.querySelector(".cagov-nav.menu-trigger").setAttribute("aria-expanded","false");let a=document.querySelector(".cagov-nav.menu-trigger-label");a.innerHTML=a.getAttribute("data-openlabel")}escapeMainMenu(a){a.keyCode===27&&this.closeAllMenus()}bodyClick(a){a.target.closest("cagov-navoverlay")||this.closeAllMenus()}closeAllMenus(){this.querySelectorAll(".js-cagov-navoverlay-expandable").forEach(t=>{t.querySelector(".expanded-menu-section").classList.remove("expanded"),t.setAttribute("aria-expanded","false");let e=t.querySelector(".expanded-menu-dropdown");e&&(e.setAttribute("aria-hidden","true"),e.querySelectorAll("a").forEach(i=>{i.setAttribute("tabindex","-1")}))})}expansionListeners(){this.querySelectorAll(".js-cagov-navoverlay-expandable").forEach(t=>{let n=t.querySelector(".expanded-menu-section");if(n){let o=n.querySelector(".expanded-menu-dropdown");o&&(o.setAttribute("aria-hidden","true"),t.setAttribute("aria-expanded","false"))}let e=this;t.addEventListener("click",function(i){i.target.nodeName!=="A"&&i.preventDefault();let s=this.querySelector(".expanded-menu-section");if(s)if(s.classList.contains("expanded"))e.closeAllMenus();else{e.closeAllMenus(),s.classList.add("expanded"),t.setAttribute("aria-expanded","true");let m=this.querySelector(".expanded-menu-dropdown");m&&(m.setAttribute("aria-hidden","false"),m.querySelectorAll("a").forEach(A=>{A.removeAttribute("tabindex")}))}})})}};window.customElements.define("cagov-navoverlay",nt);var Nt=`/* CONTENT NAVIGATION */
sidebar cagov-content-navigation .label {
  font-weight: 700;
  font-size: 24px;
  line-height: 28.2px;
  padding: 0;
  margin: 0;
  padding-bottom: 16px;
}

sidebar cagov-content-navigation ul,
sidebar cagov-content-navigation ol:not([class*=menu]):not([class*=nav]):not([class*=footer-links]),
sidebar cagov-content-navigation ul:not([class*=menu]):not([class*=nav]):not([class*=footer-links]) {
  margin: 0;
  text-indent: 0;
  padding: 0;
}

sidebar cagov-content-navigation ul li {
  padding-top: 14px;
  padding-bottom: 18px;
  margin-top: 0px;
  margin-bottom: 0px;
  border-bottom: 1px solid var(--gray-300, #e1e0e3);
  line-height: 28.2px;
  list-style: none;
}
sidebar cagov-content-navigation ul li:first-child {
  border-top: 1px solid var(--gray-300, #e1e0e3);
}
sidebar cagov-content-navigation ul li a {
  text-decoration: none;
}
sidebar cagov-content-navigation ul li a:hover {
  text-decoration: underline;
}

@media only screen and (max-width: 992px) {
  cagov-content-navigation .label {
    display: none;
  }

  .sidebar-container {
    display: block;
    width: 100%;
    max-width: 100%;
  }

  cagov-content-navigation ul li a {
    font-size: 16px;
    line-height: 24px;
  }
}

/*# sourceMappingURL=index.css.map */
`,O=class extends window.HTMLElement{connectedCallback(){this.type="wordpress",function(){function a(){let t=window,n=document;if(!("scrollBehavior"in n.documentElement.style&&t.__forceSmoothScrollPolyfill__!==!0)){let c,g=t.HTMLElement||t.Element;var e=468,o={scroll:t.scroll||t.scrollTo,scrollBy:t.scrollBy,elementScroll:g.prototype.scroll||m,scrollIntoView:g.prototype.scrollIntoView},i=t.performance&&t.performance.now?t.performance.now.bind(t.performance):Date.now,s=(c=t.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(c)?1:0);t.scroll=t.scrollTo=function(){arguments[0]!==void 0&&(u(arguments[0])!==!0?N.call(t,n.body,arguments[0].left!==void 0?~~arguments[0].left:t.scrollX||t.pageXOffset,arguments[0].top!==void 0?~~arguments[0].top:t.scrollY||t.pageYOffset):o.scroll.call(t,arguments[0].left!==void 0?arguments[0].left:typeof arguments[0]!="object"?arguments[0]:t.scrollX||t.pageXOffset,arguments[0].top!==void 0?arguments[0].top:arguments[1]!==void 0?arguments[1]:t.scrollY||t.pageYOffset))},t.scrollBy=function(){arguments[0]!==void 0&&(u(arguments[0])?o.scrollBy.call(t,arguments[0].left!==void 0?arguments[0].left:typeof arguments[0]!="object"?arguments[0]:0,arguments[0].top!==void 0?arguments[0].top:arguments[1]!==void 0?arguments[1]:0):N.call(t,n.body,~~arguments[0].left+(t.scrollX||t.pageXOffset),~~arguments[0].top+(t.scrollY||t.pageYOffset)))},g.prototype.scroll=g.prototype.scrollTo=function(){if(arguments[0]!==void 0)if(u(arguments[0])!==!0){let v=arguments[0].left,l=arguments[0].top;N.call(this,this,v===void 0?this.scrollLeft:~~v,l===void 0?this.scrollTop:~~l)}else{if(typeof arguments[0]=="number"&&arguments[1]===void 0)throw new SyntaxError("Value could not be converted");o.elementScroll.call(this,arguments[0].left!==void 0?~~arguments[0].left:typeof arguments[0]!="object"?~~arguments[0]:this.scrollLeft,arguments[0].top!==void 0?~~arguments[0].top:arguments[1]!==void 0?~~arguments[1]:this.scrollTop)}},g.prototype.scrollBy=function(){arguments[0]!==void 0&&(u(arguments[0])!==!0?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):o.elementScroll.call(this,arguments[0].left!==void 0?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,arguments[0].top!==void 0?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},g.prototype.scrollIntoView=function(){if(u(arguments[0])!==!0){let v=function(d){for(;d!==n.body&&(b=A(w=d,"Y")&&D(w,"Y"),f=A(w,"X")&&D(w,"X"),(b||f)===!1);)d=d.parentNode||d.host;let w,b,f;return d}(this),l=v.getBoundingClientRect(),p=this.getBoundingClientRect();v!==n.body?(N.call(this,v,v.scrollLeft+p.left-l.left,v.scrollTop+p.top-l.top),t.getComputedStyle(v).position!=="fixed"&&t.scrollBy({left:l.left,top:l.top,behavior:"smooth"})):t.scrollBy({left:p.left,top:p.top,behavior:"smooth"})}else o.scrollIntoView.call(this,arguments[0]===void 0||arguments[0])}}function m(c,g){this.scrollLeft=c,this.scrollTop=g}function u(c){if(c===null||typeof c!="object"||c.behavior===void 0||c.behavior==="auto"||c.behavior==="instant")return!0;if(typeof c=="object"&&c.behavior==="smooth")return!1;throw new TypeError(`behavior member of ScrollOptions ${c.behavior} is not a valid value for enumeration ScrollBehavior.`)}function A(c,g){return g==="Y"?c.clientHeight+s<c.scrollHeight:g==="X"?c.clientWidth+s<c.scrollWidth:void 0}function D(c,g){let v=t.getComputedStyle(c,null)[`overflow${g}`];return v==="auto"||v==="scroll"}function S(c){let g,v,l,p,d=(i()-c.startTime)/e;p=d=d>1?1:d,g=.5*(1-Math.cos(Math.PI*p)),v=c.startX+(c.x-c.startX)*g,l=c.startY+(c.y-c.startY)*g,c.method.call(c.scrollable,v,l),v===c.x&&l===c.y||t.requestAnimationFrame(S.bind(t,c))}function N(c,g,v){let l,p,d,w,b=i();c===n.body?(l=t,p=t.scrollX||t.pageXOffset,d=t.scrollY||t.pageYOffset,w=o.scroll):(l=c,p=c.scrollLeft,d=c.scrollTop,w=m),S({scrollable:l,method:w,startTime:b,startX:p,startY:d,x:g,y:v})}}typeof exports=="object"&&typeof module<"u"?module.exports={polyfill:a}:a()}(),this.type==="wordpress"&&document.addEventListener("DOMContentLoaded",()=>this.buildContentNavigation()),(document.readyState==="complete"||document.readyState==="loaded")&&this.buildContentNavigation()}buildContentNavigation(){let a=this.getHeaderTags(),t=null;a!==null&&(t=this.dataset.label||"On this page");let n=null;a!==null&&(n=`<nav aria-labelledby="content-navigation-label"> <div id="content-navigation-label" class="label">${t}</div> ${a}</nav>`),this.template({content:n},"wordpress")}template(a,t){return a!=null&&a.content!==null&&t==="wordpress"&&(this.innerHTML=`${a.content}`),document.querySelectorAll("a[data-content-navigation]").forEach(n=>{n.addEventListener("click",e=>{let o=decodeURI(n.getAttribute("href"));try{let i=document.querySelector(o);if(i!==null){let s=i.getBoundingClientRect();window.matchMedia("(prefers-reduced-motion)").matches||window.scrollTo({behavior:"smooth",left:s.left,top:s.top-200}),window.history.pushState(null,null,o)}}catch(i){console.error(i)}e.preventDefault()})}),null}renderNoContent(){this.innerHTML=""}getHeaderTags(){let{selector:a}=this.dataset,t=["h2"];for(let n=0;n<t.length;n+=1)if(a!=null){let e=document.querySelector(a);if(e!==null)return O.outliner(e)}return null}static outliner(a){let t=a.querySelectorAll("h2"),n="";return t!=null&&t.length>0?(t.forEach(e=>{let o=e.getAttribute("id"),i=e.innerHTML,s=e.innerHTML.toLowerCase().trim().replace(/ /g,"-").replace(/\(|\)|!|"|#|\$|%|&|'|\*|\+|,|\.|\/|:|;|<|=|>|\?|@|\[|\]|\\|\^|`|\{|\||\|\}|~/g,"").replace(/a-zA-ZÃ€-Ã–Ã™-Ã¶Ã¹-Ã¿Ä€-Å¾á¸€-á»¿0-9\u00A0-\u017F/g,"");o!=null&&(s=o),n+=`<li><a data-content-navigation href="#${encodeURI(s)}">${i}</a></li>`,o==null&&(o=s,e.setAttribute("id",o))}),`<ul>${n}</ul>`):null}};customElements.get("cagov-content-navigation")===void 0&&window.customElements.define("cagov-content-navigation",O);var et=document.createElement("style");et.textContent=Nt;document.querySelector("head").appendChild(et);function Lt(){let r='<span class="pdf-link-icon" aria-hidden="true"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="25.1px" height="13.6px" viewBox="0 0 25.1 13.6" style="enable-background:new 0 0 25.1 13.6;" xml:space="preserve"><path d="M11.7,9.9h1.5c1.7,0,3.1-1.4,3.1-3.1s-1.4-3.1-3.1-3.1h-1.5c-0.3,0-0.6,0.3-0.6,0.6v4.9c0,0.2,0.1,0.3,0.2,0.4C11.4,9.9,11.6,9.9,11.7,9.9L11.7,9.9z M12.3,5h0.9c1,0,1.8,0.8,1.8,1.8s-0.8,1.8-1.8,1.8h-0.9V5z"/><path d="M17.8,9.9c0.2,0,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.3,0.2-0.4V7.5h1.2c0.3,0,0.6-0.3,0.6-0.6c0-0.3-0.3-0.6-0.6-0.6h-1.2V5h2.1c0.3,0,0.6-0.3,0.6-0.6c0-0.3-0.3-0.6-0.6-0.6h-2.8c-0.3,0-0.6,0.3-0.6,0.6v4.9c0,0.2,0.1,0.3,0.2,0.4C17.5,9.9,17.7,9.9,17.8,9.9L17.8,9.9z"/><path d="M6.2,9.9c0.2,0,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.3,0.2-0.4V8.1H8c1.2,0,2.1-1,2.1-2.1c0-1.2-1-2.1-2.1-2.1H6.2c-0.3,0-0.6,0.3-0.6,0.6v4.9c0,0.2,0.1,0.3,0.2,0.4C5.9,9.9,6,9.9,6.2,9.9L6.2,9.9z M9,6c0,0.3-0.1,0.5-0.2,0.7C8.5,6.8,8.3,6.9,8,6.9H6.8V5H8c0.2,0,0.5,0.1,0.7,0.2C8.9,5.5,9,5.7,9,6L9,6z"/></svg></span><span class="sr-only"> (this is a pdf file)</span>',a=document.querySelectorAll("a[href*='.pdf']");for(let t=0;t<a.length;t+=1)a[t].innerHTML+=r,a[t].innerHTML.indexOf("*PDF (this is a pdf file)*")!==-1&&(a[t].innerHTML+=r.replace(/PDF (this is a pdf file)]/g,""))}Lt();function Et(){let r='<span class="external-link-icon" aria-hidden="true"><svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path d="M1.4,13.3c0-1.9,0-3.8,0-5.7c0-2.3,1.3-3.6,3.7-3.7c2,0,3.9,0,5.9,0c0.9,0,1.4,0.4,1.4,1.1c0,0.7-0.5,1.1-1.5,1.1 c-2,0-3.9,0-5.9,0c-1.1,0-1.4,0.3-1.4,1.5c0,3.8,0,7.6,0,11.3c0,1.1,0.4,1.5,1.5,1.5c3.8,0,7.6,0,11.3,0c1.1,0,1.4-0.3,1.4-1.5 c0-1.9,0-3.9,0-5.8c0-1,0.4-1.5,1.1-1.5c0.7,0,1.1,0.5,1.1,1.5c0,2,0,4,0,6.1c0,2-1.4,3.4-3.4,3.4c-4,0-7.9,0-11.9,0 c-2.1,0-3.4-1.4-3.4-3.4C1.4,17.2,1.4,15.2,1.4,13.3L1.4,13.3z"/><path d="M19.6,2.8c-1.3,0-2.5,0-3.6,0c-0.9,0-1.4-0.4-1.4-1.1c0.1-0.8,0.6-1.1,1.3-1.1c2.1,0,4.2,0,6.2,0c0.8,0,1.2,0.5,1.2,1.3 c0,2,0,4.1,0,6.2c0,0.9-0.4,1.4-1.1,1.4c-0.7,0-1.1-0.5-1.1-1.4c0-1.1,0-2.3,0-3.6c-0.3,0.3-0.6,0.5-0.8,0.7c-3,3-6,6-8.9,8.9 c-0.2,0.2-0.3,0.3-0.5,0.5c-0.5,0.5-1.1,0.5-1.6,0c-0.5-0.5-0.4-1,0-1.5c0.1-0.2,0.3-0.3,0.5-0.5c3-3,6-6,8.9-8.9 C19,3.4,19.2,3.2,19.6,2.8L19.6,2.8z"/></svg></span>';function a(n){return window.location.host.indexOf(n.host)>-1}document.querySelectorAll("main a, .agency-footer a, .site-footer a, footer a").forEach(n=>{let e=n.href.indexOf("#")===0,o=n.href.indexOf("localhost")>-1,i=n.href.indexOf("@")>-1,s=n;a(s)===!1&&!e&&!i&&!o&&(s.innerHTML+=r)})}Et();var Tt=`/* Back to top button */
cagov-back-to-top .back-to-top {
  position: fixed;
  z-index: 99999;
  right: -100px;
  font-size: var(--body-text, 1.125rem);
  padding: 10px 10px 10px 10px;
  bottom: 50px;
  opacity: 0;
  visibility: hidden;
  color: var(--primary-color, #004abc);
  border: 1px solid var(--primary-color, #004abc);
  border-radius: 5px 0px 0px 5px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s ease;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}
@media (max-width: 768px) {
  cagov-back-to-top .back-to-top {
    font-size: var(--body-text-mobile, 1rem);
    padding: 8px 8px 8px 8px;
  }
}
cagov-back-to-top .back-to-top:hover {
  color: var(--primary-dark-color, #003484);
  border: 1px solid var(--primary-dark-color, #003484);
  background-color: var(--gray-100, #f9f9fa);
}
cagov-back-to-top .back-to-top:hover svg path {
  fill: var(--primary-dark-color, #003484);
}
cagov-back-to-top .back-to-top:focus {
  outline: 2px solid var(--highlight-color, #fec02f);
}
cagov-back-to-top .back-to-top svg {
  width: 16px;
  position: relative;
  top: 3px;
}
cagov-back-to-top .back-to-top svg path {
  fill: var(--primary-color, #004abc);
}
cagov-back-to-top .back-to-top.is-visible {
  opacity: 1;
  visibility: visible;
  display: inline;
  right: 0;
}

/*# sourceMappingURL=index.css.map */
`,T=class extends window.HTMLElement{static get observedAttributes(){return["data-hide-after","data-label"]}constructor(){super();let a={parentSelector:"cagov-back-to-top",onLoadSelector:"body",scrollBottomThreshold:10,scrollAfterHeight:400};this.options={...a,label:this.dataset.label||"Back to top",hideAfter:Number(this.dataset.hideAfter)||7e3},this.state={lastScrollTop:0,timer:null}}connectedCallback(){document.querySelector(this.options.onLoadSelector).onload=this.addGoToTopButton(),window.addEventListener("scroll",T.debounce(()=>{this.scrollToTopHandler()},200),!1),window.onscroll=T.debounce(()=>{this.checkScrolledToBottom()},200)}checkScrolledToBottom(){let{timer:a}=this.state,t=document.querySelector(".back-to-top");window.innerHeight+window.scrollY>=document.body.offsetHeight&&(t.classList.add("is-visible"),t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex"),clearTimeout(a))}static debounce(a,t,n){let e;return(...o)=>{let i=this,s=()=>{e=null,n||a.apply(i,...o)},m=n&&!e;clearTimeout(e),e=setTimeout(s,t),m&&a.apply(i,...o)}}attributeChangedCallback(a,t,n){a==="data-hide-after"&&(this.options.hideAfter=Number(n)),a==="data-label"&&(this.options.label=n,document.querySelector(".back-to-top")!==null&&(document.querySelector(".back-to-top").innerHTML=this.options.label))}scrollToTopHandler(){let a=document.querySelector(this.options.parentSelector),{lastScrollTop:t}=this.state,{timer:n}=this.state,e=document.querySelector(".back-to-top"),o=window.pageYOffset||document.documentElement.scrollTop;o>t?(e.classList.remove("is-visible"),e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex","-1")):a.scrollTop>=this.options.scrollAfterHeight||document.documentElement.scrollTop>=this.options.scrollAfterHeight?(n!==null&&clearTimeout(n),e.classList.add("is-visible"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),n=setTimeout(()=>{e.classList.remove("is-visible"),e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex","-1")},this.options.hideAfter)):(e.classList.remove("is-visible"),e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex","-1")),this.state.lastScrollTop=o<=0?0:o}static addStyle(a){let t=document.createElement("span");t.setAttribute("aria-hidden","true"),t.innerHTML=`
      <svg version="1.1" x="0px" y="0px" width="21px" height="16px" viewBox="0 0 21 16" style="enable-background:new 0 0 21 16;" xml:space="preserve"><path d="M5.2,10.8l5.3-5.3l5.3,5.3c0.4,0.4,0.9,0.4,1.3,0c0.4-0.4,0.4-0.9,0-1.3l-5.9-5.9c-0.2-0.2-0.4-0.3-0.6-0.3S10,3.5,9.8,3.6 L3.9,9.5c-0.4,0.4-0.4,0.9,0,1.3C4.3,11.2,4.8,11.2,5.2,10.8z"/></svg> 
      `,a.insertBefore(t,a.firstChild)}addGoToTopButton(){let a=document.querySelector(this.options.parentSelector),t=document.createElement("button");t.classList.add("back-to-top"),t.setAttribute("aria-hidden","true"),t.setAttribute("tabindex","-1");let n=document.createTextNode(this.options.label);t.appendChild(n),T.addStyle(t),a.append(t),t.addEventListener("click",()=>this.goToTopFunction())}goToTopFunction(){document.querySelector(this.options.onLoadSelector).scrollTop=0,window.scroll({top:0,behavior:"smooth"})}};window.customElements.define("cagov-back-to-top",T);var ot=document.createElement("style");ot.textContent=Tt;document.querySelector("head").appendChild(ot);var ct=class extends window.HTMLElement{connectedCallback(){this.type="wordpress",this.message=this.dataset.message||"",this.icon=this.dataset.icon||"",this.type==="wordpress"&&document.addEventListener("DOMContentLoaded",()=>{this.template({message:this.message,icon:this.icon},"wordpress"),document.querySelector("cagov-page-alert .close-button").addEventListener("click",a=>{document.querySelector("cagov-page-alert").style.display="none"})})}template(a,t){return a!=null&&a.content!==null&&t==="wordpress"&&(this.innerHTML=`<div class="cagov-page-alert cagov-stack"><div class="icon"><span class="${this.icon}"></span></div>
        <div class="body">${this.message}</div>
        <div class="close-button"><span class="ca-gov-icon-close-line"></span></div></div>`),null}};customElements.get("cagov-page-alert")===void 0&&window.customElements.define("cagov-page-alert",ct);var qt="April 28, 2022",Mt="/assets/img/usdm-assets/20220426_usdm_excerpt.png",U={dateString:qt,filePath:Mt};var rt=class extends window.HTMLElement{connectedCallback(){console.log("Loading Drought Map"),this.type="wordpress",this.type==="wordpress"&&document.addEventListener("DOMContentLoaded",()=>{this.template({},"wordpress")})}template(a,t){return a!=null&&a.content!==null&&t==="wordpress"&&(this.innerHTML=`<div class="cagov-drought-map">
                <p class="map-label">Released ${U.dateString}. Updates automatically each Thursday.</p>

                <p>Click the map to see the intensity of drought conditions in California:</p>
                <div class="drought-map-container">
                  <div class="drought-map-image"><a href="https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?CA"><img src="${U.filePath}" /></a></div>
                  <div class="legend-label"><h4>Intensity</h4></div>
                  <div class="drought-map-legend">
                      <div class="col-1">
                          <div class="legend"><span class="intensity intensity-ldnone"> </span>None</div>
                          <div class="legend"><span class="intensity intensity-ld0"> </span>D0 (Abnormally dry)</div>
                          <div class="legend"><span class="intensity intensity-ld1"> </span>D1 (Moderate drought)</div>
                      </div>
                      <div class="col-2">
                          <div class="legend"><span class="intensity intensity-ld2"> </span>D2 (Severe drought)</div>
                          <div class="legend"><span class="intensity intensity-ld3"> </span>D3 (Extreme drought)</div>
                          <div class="legend"><span class="intensity intensity-ld4"> </span>D4 (Exceptional drought)</div>
                      </div>
                      <div class="col-3">
                          <div class="legend"><span class="intensity intensity-ldnodata"> </span>No data</div>
                      </div>
                  </div>
                  <div class="map-link"><a href="https://droughtmonitor.unl.edu/">View details on US Drought Monitor</a></div>
                </div>
            </div>`),null}};customElements.get("cagov-drought-map")===void 0&&window.customElements.define("cagov-drought-map",rt);var it=`.popover-content {
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  background-color: white;
  padding: 1rem;
  z-index: 100;
  outline: 0;
  border-radius: .5rem;
  overflow: visible;
  pointer-events: none;
  --shadow-color: 220 3% 15%;
  --shadow-strength: 1%;
  box-shadow:  0 -1px 2px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
  0 2px 1px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),
  0 5px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),
  0 10px 10px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),
  0 20px 20px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),
  0 40px 40px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));;
}
.popover-content:focus {
  outline: 2px solid var(--highlight-color, #fec02f);
}

.popover-container {
  position: relative;
  width: fit-content;
}

.popover-content::before {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  left: 0;
  top: 50%;
  background-color: white;
  transform: translate(-50%, -50%) rotate(45deg);
}
.popover-revealed {
  width: max-content;
  height: max-content;
  left: var(--x);
  top: var(--y);
  transform: translateY(-50%);
}
@media screen and (max-width: 950px) {
  .popover-content::before {
    content: none;
  }
  .popover-revealed {
    left: calc(50% + var(--x-offset-m, 0%));
    transform: translate(-50%, 0);
  }
}

.popover-legend {
  display: flex;
  flex-direction: row;
  gap: .75rem;
  align-items: flex-start;
}

.popover-legend svg {
  height: 1.5em;
}

.sr-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.popover-revealed p {
  font-weight: 400;
  font-size: 1em;
}

.popover-header {
  margin: 0;
}

.popover-stat {
  margin: 0 0 .5rem 0;
}`;var st=class extends window.HTMLElement{constructor(a,t){super();let n=document.createElement("template");n.innerHTML=a;let e=document.createElement("style");e.append(it),n.content.prepend(e),this.attachShadow({mode:"open"}),this.shadowRoot.append(n.content.cloneNode(!0)),this.shadowRoot.querySelector("style").append(t)}buildPopOverElement({container:a,x:t,y:n,legendSvg:e,legendText:o,content:i,xOffsetM:s="0%"}){let m=document.createElement("div");return m.setAttribute("tabindex","0"),m.classList.add("popover-content"),m.style.setProperty("--x",t),m.style.setProperty("--y",n),m.style.setProperty("--x-offset-m",s),m.innerHTML=`
      <div class="popover-legend">
        ${e}
        <p class="popover-header">${o}</p>
      </div>
      <p class="popover-stat">${i}</p>
    `,a.append(m),m}setUpPopOvers(a,t){t.addEventListener("mouseover",n=>{a.classList.add("popover-revealed"),t.classList.add("highlighted")}),a.addEventListener("focus",n=>{a.classList.add("popover-revealed"),t.classList.add("highlighted")}),t.addEventListener("mouseout",n=>{a.classList.remove("popover-revealed"),t.classList.remove("highlighted")}),a.addEventListener("blur",n=>{a.classList.remove("popover-revealed"),t.classList.remove("highlighted")})}},z=st;var mt=`.reservoir-data-viz {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 1rem;
}

.reservoir-data-viz-graphic svg {
  display: block;
}

.reservoir-data-viz-overall {
  color: #B71234;
}

#basin-water {
  fill: #003484;
}

#basin-water.highlighted,
#reservoir-details-filled svg,
.filled {
  fill: #004ABC;
}

#basin-capacity {
  fill: #E1E0E3;
}

#basin-capacity.highlighted,
#reservoir-details-capacity svg,
.capacity {
  fill: #B3B2B8;
}

#historical-line, 
#reservoir-details-average svg,
.historical {
  stroke: black;
}

#historical-line-hover-target {
  opacity: 0;
}

#historical-line-hover-target.highlighted {
  opacity: 0.3;
  fill: yellow;
}`;var gt=`<div class="reservoir-data-viz">
  <div class="reservoir-data-viz-graphic popover-container" aria-hidden="true">
    <svg width="150" height="150" viewBox="0 0 150 150">
      <defs>
        <!-- Clip in rounded corners on the bottom of the water. -->
        <clipPath id="rounded-water-bottom">
          <rect x="30" y="-15" width="90" height="150" rx="15" ry="15" />
        </clipPath>
      </defs>
      <!-- Create the basin. It's static. -->
      <path id="basin-capacity" d="M0,150 L15,0 h10 v125 a15,15 0 0 0 15,15 h70 a15,15 0 0 0 15,-15 v-125 h10 L150,150 z" />
      <!-- Create the water. The bottom of the water is at y=135. -->
      <rect id="basin-water" x="30" y="0" width="90" height="0" clip-path="url(#rounded-water-bottom)" />
      <!-- Draw the dotted line for the average level. -->
      <line id="historical-line" x1="0" y1="0" x2="150" y2="0" stroke-width="3" stroke-dasharray="3 6" stroke-linecap="round" />
      <!-- Draw an invisible rectangle over the line, to help people hover over it. -->
      <rect id="historical-line-hover-target" x="0" y="0" width="150" height="10" />
    </svg>
  </div>

  <div class="reservoir-data-viz-overall">
    <slot name="current-level"></slot>
  </div>
</div>
<div class="sr-only">
  <slot name="table-data"></slot>
</div>`;var vt=class extends z{constructor(){super(gt,mt)}connectedCallback(){let a=parseInt(this.dataset.currentTaf),t=parseInt(this.dataset.historicalTaf),n=parseInt(this.dataset.capacityTaf),e=Math.round(100*a/n),o=Math.round(100*t/n),i=135,s=Math.round(i-i*o/100),m=s-5,u=Math.round(i-i*e/100),A=Math.round(i*e/100),D=this.shadowRoot.querySelector(".popover-container"),S=150,N=150,c=this.querySelector("#current-taf-heading").innerHTML,g=this.querySelector(".reservoir-current").innerHTML,v=this.buildPopOverElement({container:D,x:`${(S-28)/S*100}%`,y:"70%",xOffsetM:"65%",content:g,legendText:c,legendSvg:`
        <svg width="13" height="13" viewBox="0 0 10 10" aria-hidden="true">
          <rect x="0" y="0" width="10" height="10" class="filled" />
        </svg>
      `}),l=this.shadowRoot.querySelector("#basin-water");l.setAttribute("y",u),l.setAttribute("height",A),this.setUpPopOvers(v,l);let p=this.querySelector("#historical-taf-heading").innerHTML,d=this.querySelector(".reservoir-historic").innerHTML,w=this.buildPopOverElement({container:D,x:`${(S-8)/S*100}%`,y:"23%",xOffsetM:"65%",content:d,legendText:p,legendSvg:`
        <svg width="26" height="13" viewBox="0 0 26 13" aria-hidden="true">
          <line x1="0" y1="7" x2="26" y2="7" stroke-width="2" stroke-dasharray="2 4" stroke-linecap="round" class="historical" />
        </svg>
      `}),b=this.shadowRoot.querySelector("#historical-line"),f=this.shadowRoot.querySelector("#historical-line-hover-target");b.setAttribute("y1",s),b.setAttribute("y2",s),f.setAttribute("y",m),this.setUpPopOvers(w,f);let M=this.querySelector("#capacity-taf-heading").innerHTML,C=this.querySelector(".reservoir-capacity").innerHTML,x=this.buildPopOverElement({container:D,x:`${(S-8)/S*100}%`,y:"50%",xOffsetM:"65%",content:C,legendText:M,legendSvg:`
        <svg width="13" height="13" viewBox="0 0 10 10" aria-hidden="true">
          <rect x="0" y="0" width="10" height="10" class="capacity" />
        </svg>
      `}),Y=this.shadowRoot.querySelector("#basin-capacity");this.setUpPopOvers(x,Y)}};window.customElements.define("drought-reservoir-levels",vt);var lt=`.snowpack-data-viz-overall {
  color: #B71234;
  margin: .5rem 0 1rem 0;
}

#snowpack-graph {
  display: block;
  width: 100%;
  height: auto;
}

line {
  stroke: #E1E0E3;
}

.avg {
  stroke: #E5E5E5;
  fill: #E5E5E5;
}

.current {
  stroke: #003484;
  stroke-width: 3;
  fill: transparent;
}

.current-terminus {
  fill: #003484;
}

#current-terminus-hover-target,
#historic-peak-hover-target {
  fill: transparent;
}

#current-terminus-hover-target.highlighted,
#historic-peak-hover-target.highlighted {
  opacity: 0.3;
  fill: yellow;
}

.peak {
  fill: #B71234;
}

text {
  font-size: .9rem;
}

#snowpack-historical-peak-swe.popover-revealed {
  left: var(--x, 200px);
  top: var(--y, 20px);
  transform: translateY(-50%);
}

#snowpack-current-swe.popover-revealed {
  left: var(--x, 200px);
  top: var(--y, 100px);
  transform: translateY(-50%);
}`;var dt=`<div class="snowpack-data-viz">
  <div class="snowpack-data-viz-overall">
    <slot name="current-level"></slot>
  </div>

  <div class="popover-container" aria-hidden="true">
    <svg id="snowpack-graph" width="365" height="175" viewBox="0 0 365 175">
      <line x1="0" y1="145" x2="365" y2="145" stroke-width="1" />
  
      <line x1="31" y1="0" x2="31" y2="145" stroke-width="1" />
      <text x="31" y="160" dominant-baseline="middle" id="snowpack-month-11" text-anchor="middle"></text>
  
      <line x1="92" y1="0" x2="92" y2="145" stroke-width="1" />
      <text x="92" y="160" dominant-baseline="middle" id="snowpack-month-1" text-anchor="middle"></text>
  
      <line x1="151" y1="0" x2="151" y2="145" stroke-width="1" />
      <text x="151" y="160" dominant-baseline="middle" id="snowpack-month-3" text-anchor="middle"></text>
      
      <line x1="212" y1="0" x2="212" y2="145" stroke-width="1" />
      <text x="212" y="160" dominant-baseline="middle" id="snowpack-month-5" text-anchor="middle"></text>
  
      <line x1="273" y1="0" x2="273" y2="145" stroke-width="1" />
      <text x="273" y="160" dominant-baseline="middle" id="snowpack-month-7" text-anchor="middle"></text>
  
      <line x1="335" y1="0" x2="335" y2="145" stroke-width="1" />
      <text x="335" y="160" dominant-baseline="middle" id="snowpack-month-9" text-anchor="middle"></text>
    </svg>
  </div>
</div>
<div class="sr-only">
  <slot name="table-data"></slot>
</div>`;var Bt=[{month:10,day:1,avg:0,wmonth:1,norm:0,avgAvgSwc:-.01},{month:10,day:2,avg:0,wmonth:1,norm:.03,avgAvgSwc:0},{month:10,day:3,avg:0,wmonth:1,norm:0,avgAvgSwc:-.01},{month:10,day:4,avg:.001,wmonth:1,norm:0,avgAvgSwc:-.01},{month:10,day:5,avg:.001,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:6,avg:.001,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:7,avg:.001,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:8,avg:.002,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:9,avg:.002,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:10,avg:.002,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:11,avg:.003,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:12,avg:.003,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:13,avg:.004,wmonth:1,norm:0,avgAvgSwc:0},{month:10,day:14,avg:.004,wmonth:1,norm:.57,avgAvgSwc:.16},{month:10,day:15,avg:.005,wmonth:1,norm:.46,avgAvgSwc:.14},{month:10,day:16,avg:.006,wmonth:1,norm:.43,avgAvgSwc:.11},{month:10,day:17,avg:.007,wmonth:1,norm:.36,avgAvgSwc:.1},{month:10,day:18,avg:.008,wmonth:1,norm:.46,avgAvgSwc:.13},{month:10,day:19,avg:.009,wmonth:1,norm:.44,avgAvgSwc:.13},{month:10,day:20,avg:.01,wmonth:1,norm:1.15,avgAvgSwc:.33},{month:10,day:21,avg:.012,wmonth:1,norm:1.44,avgAvgSwc:.42},{month:10,day:22,avg:.013,wmonth:1,norm:1.38,avgAvgSwc:.39},{month:10,day:23,avg:.015,wmonth:1,norm:1.7,avgAvgSwc:.48},{month:10,day:24,avg:.016,wmonth:1,norm:1.92,avgAvgSwc:.57},{month:10,day:25,avg:.018,wmonth:1,norm:2.22,avgAvgSwc:.65},{month:10,day:26,avg:.02,wmonth:1,norm:2.69,avgAvgSwc:.77},{month:10,day:27,avg:.022,wmonth:1,norm:3.14,avgAvgSwc:.9},{month:10,day:28,avg:.024,wmonth:1,norm:3.06,avgAvgSwc:.89},{month:10,day:29,avg:.026,wmonth:1,norm:2.97,avgAvgSwc:.87},{month:10,day:30,avg:.028,wmonth:1,norm:2.89,avgAvgSwc:.84},{month:10,day:31,avg:.03,wmonth:1,norm:2.25,avgAvgSwc:.66},{month:11,day:1,avg:.033,wmonth:2,norm:1.66,avgAvgSwc:.47},{month:11,day:2,avg:.036,wmonth:2,norm:2.1,avgAvgSwc:.6},{month:11,day:3,avg:.039,wmonth:2,norm:2.33,avgAvgSwc:.67},{month:11,day:4,avg:.042,wmonth:2,norm:2.69,avgAvgSwc:.76},{month:11,day:5,avg:.045,wmonth:2,norm:2.64,avgAvgSwc:.75},{month:11,day:6,avg:.048,wmonth:2,norm:2.87,avgAvgSwc:.81},{month:11,day:7,avg:.052,wmonth:2,norm:2.96,avgAvgSwc:.83},{month:11,day:8,avg:.055,wmonth:2,norm:3.54,avgAvgSwc:1},{month:11,day:9,avg:.059,wmonth:2,norm:4.44,avgAvgSwc:1.24},{month:11,day:10,avg:.063,wmonth:2,norm:4.94,avgAvgSwc:1.39},{month:11,day:11,avg:.067,wmonth:2,norm:5.06,avgAvgSwc:1.43},{month:11,day:12,avg:.07,wmonth:2,norm:5.23,avgAvgSwc:1.48},{month:11,day:13,avg:.075,wmonth:2,norm:5.46,avgAvgSwc:1.53},{month:11,day:14,avg:.079,wmonth:2,norm:5.4,avgAvgSwc:1.54},{month:11,day:15,avg:.083,wmonth:2,norm:5.37,avgAvgSwc:1.53},{month:11,day:16,avg:.087,wmonth:2,norm:5.46,avgAvgSwc:1.54},{month:11,day:17,avg:.092,wmonth:2,norm:6.04,avgAvgSwc:1.71},{month:11,day:18,avg:.096,wmonth:2,norm:5.37,avgAvgSwc:1.52},{month:11,day:19,avg:.101,wmonth:2,norm:5.45,avgAvgSwc:1.53},{month:11,day:20,avg:.106,wmonth:2,norm:6.02,avgAvgSwc:1.67},{month:11,day:21,avg:.111,wmonth:2,norm:6.4,avgAvgSwc:1.81},{month:11,day:22,avg:.116,wmonth:2,norm:6.72,avgAvgSwc:1.91},{month:11,day:23,avg:.121,wmonth:2,norm:7.03,avgAvgSwc:1.99},{month:11,day:24,avg:.126,wmonth:2,norm:7.25,avgAvgSwc:2.04},{month:11,day:25,avg:.132,wmonth:2,norm:7.31,avgAvgSwc:2.05},{month:11,day:26,avg:.137,wmonth:2,norm:7.19,avgAvgSwc:2.06},{month:11,day:27,avg:.143,wmonth:2,norm:7.54,avgAvgSwc:2.14},{month:11,day:28,avg:.148,wmonth:2,norm:8.53,avgAvgSwc:2.43},{month:11,day:29,avg:.154,wmonth:2,norm:9.38,avgAvgSwc:2.67},{month:11,day:30,avg:.16,wmonth:2,norm:9.5,avgAvgSwc:2.69},{month:12,day:1,avg:.165,wmonth:3,norm:9.48,avgAvgSwc:2.71},{month:12,day:2,avg:.17,wmonth:3,norm:10.59,avgAvgSwc:3.05},{month:12,day:3,avg:.175,wmonth:3,norm:11.34,avgAvgSwc:3.27},{month:12,day:4,avg:.18,wmonth:3,norm:11.79,avgAvgSwc:3.36},{month:12,day:5,avg:.185,wmonth:3,norm:11.85,avgAvgSwc:3.41},{month:12,day:6,avg:.191,wmonth:3,norm:12.35,avgAvgSwc:3.56},{month:12,day:7,avg:.196,wmonth:3,norm:12.72,avgAvgSwc:3.67},{month:12,day:8,avg:.202,wmonth:3,norm:13.85,avgAvgSwc:4.02},{month:12,day:9,avg:.207,wmonth:3,norm:14.15,avgAvgSwc:4.11},{month:12,day:10,avg:.213,wmonth:3,norm:14.55,avgAvgSwc:4.21},{month:12,day:11,avg:.218,wmonth:3,norm:14.95,avgAvgSwc:4.34},{month:12,day:12,avg:.224,wmonth:3,norm:15.43,avgAvgSwc:4.47},{month:12,day:13,avg:.23,wmonth:3,norm:16.64,avgAvgSwc:4.83},{month:12,day:14,avg:.236,wmonth:3,norm:17.46,avgAvgSwc:5.06},{month:12,day:15,avg:.242,wmonth:3,norm:18.32,avgAvgSwc:5.31},{month:12,day:16,avg:.248,wmonth:3,norm:19.21,avgAvgSwc:5.58},{month:12,day:17,avg:.255,wmonth:3,norm:20.26,avgAvgSwc:5.81},{month:12,day:18,avg:.261,wmonth:3,norm:20.89,avgAvgSwc:6.08},{month:12,day:19,avg:.267,wmonth:3,norm:21.84,avgAvgSwc:6.35},{month:12,day:20,avg:.274,wmonth:3,norm:22.83,avgAvgSwc:6.66},{month:12,day:21,avg:.28,wmonth:3,norm:23.52,avgAvgSwc:6.9},{month:12,day:22,avg:.287,wmonth:3,norm:24.46,avgAvgSwc:7.17},{month:12,day:23,avg:.294,wmonth:3,norm:25.26,avgAvgSwc:7.42},{month:12,day:24,avg:.3,wmonth:3,norm:26.27,avgAvgSwc:7.7},{month:12,day:25,avg:.307,wmonth:3,norm:27.16,avgAvgSwc:7.99},{month:12,day:26,avg:.314,wmonth:3,norm:28.26,avgAvgSwc:8.31},{month:12,day:27,avg:.321,wmonth:3,norm:30.18,avgAvgSwc:8.87},{month:12,day:28,avg:.328,wmonth:3,norm:30.83,avgAvgSwc:9.06},{month:12,day:29,avg:.335,wmonth:3,norm:31.83,avgAvgSwc:9.35},{month:12,day:30,avg:.343,wmonth:3,norm:32.86,avgAvgSwc:9.64},{month:12,day:31,avg:.35,wmonth:3,norm:32.3,avgAvgSwc:9.53},{month:1,day:1,avg:.358,wmonth:4,norm:32.91,avgAvgSwc:9.71},{month:1,day:2,avg:.366,wmonth:4,norm:33.93,avgAvgSwc:10.02},{month:1,day:3,avg:.373,wmonth:4,norm:34.74,avgAvgSwc:10.25},{month:1,day:4,avg:.381,wmonth:4,norm:35.4,avgAvgSwc:10.46},{month:1,day:5,avg:.389,wmonth:4,norm:36.82,avgAvgSwc:10.89},{month:1,day:6,avg:.397,wmonth:4,norm:37.49,avgAvgSwc:11.1},{month:1,day:7,avg:.405,wmonth:4,norm:38.17,avgAvgSwc:11.3},{month:1,day:8,avg:.413,wmonth:4,norm:38.95,avgAvgSwc:11.54},{month:1,day:9,avg:.421,wmonth:4,norm:39.9,avgAvgSwc:11.79},{month:1,day:10,avg:.429,wmonth:4,norm:40.8,avgAvgSwc:12.04},{month:1,day:11,avg:.437,wmonth:4,norm:41.81,avgAvgSwc:12.31},{month:1,day:12,avg:.446,wmonth:4,norm:42.35,avgAvgSwc:12.46},{month:1,day:13,avg:.454,wmonth:4,norm:42.88,avgAvgSwc:12.58},{month:1,day:14,avg:.462,wmonth:4,norm:43.29,avgAvgSwc:12.68},{month:1,day:15,avg:.471,wmonth:4,norm:43.87,avgAvgSwc:12.85},{month:1,day:16,avg:.479,wmonth:4,norm:44.34,avgAvgSwc:12.95},{month:1,day:17,avg:.487,wmonth:4,norm:44.89,avgAvgSwc:13.1},{month:1,day:18,avg:.496,wmonth:4,norm:45.38,avgAvgSwc:13.22},{month:1,day:19,avg:.504,wmonth:4,norm:46.46,avgAvgSwc:13.52},{month:1,day:20,avg:.513,wmonth:4,norm:45.59,avgAvgSwc:13.28},{month:1,day:21,avg:.522,wmonth:4,norm:46.58,avgAvgSwc:13.57},{month:1,day:22,avg:.53,wmonth:4,norm:48.56,avgAvgSwc:14.16},{month:1,day:23,avg:.539,wmonth:4,norm:49.47,avgAvgSwc:14.42},{month:1,day:24,avg:.548,wmonth:4,norm:50.23,avgAvgSwc:14.59},{month:1,day:25,avg:.556,wmonth:4,norm:50.96,avgAvgSwc:14.71},{month:1,day:26,avg:.565,wmonth:4,norm:51.44,avgAvgSwc:14.82},{month:1,day:27,avg:.574,wmonth:4,norm:52.07,avgAvgSwc:14.99},{month:1,day:28,avg:.583,wmonth:4,norm:52.91,avgAvgSwc:15.25},{month:1,day:29,avg:.592,wmonth:4,norm:52.47,avgAvgSwc:15.12},{month:1,day:30,avg:.601,wmonth:4,norm:52.97,avgAvgSwc:15.26},{month:1,day:31,avg:.61,wmonth:4,norm:54.57,avgAvgSwc:15.41},{month:2,day:1,avg:.621,wmonth:5,norm:55.11,avgAvgSwc:15.83},{month:2,day:2,avg:.631,wmonth:5,norm:55.46,avgAvgSwc:15.97},{month:2,day:3,avg:.642,wmonth:5,norm:56.68,avgAvgSwc:16.34},{month:2,day:4,avg:.652,wmonth:5,norm:57.46,avgAvgSwc:16.54},{month:2,day:5,avg:.662,wmonth:5,norm:58.02,avgAvgSwc:16.7},{month:2,day:6,avg:.672,wmonth:5,norm:58.5,avgAvgSwc:16.84},{month:2,day:7,avg:.682,wmonth:5,norm:59.51,avgAvgSwc:17.13},{month:2,day:8,avg:.692,wmonth:5,norm:60.24,avgAvgSwc:17.36},{month:2,day:9,avg:.702,wmonth:5,norm:60.85,avgAvgSwc:17.52},{month:2,day:10,avg:.712,wmonth:5,norm:61.4,avgAvgSwc:17.67},{month:2,day:11,avg:.721,wmonth:5,norm:62.18,avgAvgSwc:17.83},{month:2,day:12,avg:.731,wmonth:5,norm:62.72,avgAvgSwc:17.93},{month:2,day:13,avg:.74,wmonth:5,norm:63.21,avgAvgSwc:18.04},{month:2,day:14,avg:.75,wmonth:5,norm:64.02,avgAvgSwc:18.21},{month:2,day:15,avg:.759,wmonth:5,norm:64.71,avgAvgSwc:18.38},{month:2,day:16,avg:.768,wmonth:5,norm:65.5,avgAvgSwc:18.6},{month:2,day:17,avg:.777,wmonth:5,norm:66.36,avgAvgSwc:18.85},{month:2,day:18,avg:.786,wmonth:5,norm:67.29,avgAvgSwc:19.1},{month:2,day:19,avg:.795,wmonth:5,norm:66.71,avgAvgSwc:18.9},{month:2,day:20,avg:.804,wmonth:5,norm:68.84,avgAvgSwc:19.51},{month:2,day:21,avg:.812,wmonth:5,norm:69.7,avgAvgSwc:19.74},{month:2,day:22,avg:.821,wmonth:5,norm:70.57,avgAvgSwc:20},{month:2,day:23,avg:.829,wmonth:5,norm:71.63,avgAvgSwc:20.26},{month:2,day:24,avg:.838,wmonth:5,norm:72.75,avgAvgSwc:20.56},{month:2,day:25,avg:.846,wmonth:5,norm:73.23,avgAvgSwc:20.7},{month:2,day:26,avg:.854,wmonth:5,norm:74.44,avgAvgSwc:21.03},{month:2,day:27,avg:.862,wmonth:5,norm:75.77,avgAvgSwc:21.4},{month:2,day:28,avg:.87,wmonth:5,norm:76.71,avgAvgSwc:21.62},{month:2,day:29,avg:.87,wmonth:5,norm:72.48,avgAvgSwc:19.64},{month:3,day:1,avg:.879,wmonth:6,norm:77.34,avgAvgSwc:21.78},{month:3,day:2,avg:.887,wmonth:6,norm:78.07,avgAvgSwc:21.87},{month:3,day:3,avg:.895,wmonth:6,norm:79.07,avgAvgSwc:22.27},{month:3,day:4,avg:.903,wmonth:6,norm:79.84,avgAvgSwc:22.47},{month:3,day:5,avg:.91,wmonth:6,norm:80.15,avgAvgSwc:22.56},{month:3,day:6,avg:.917,wmonth:6,norm:81.17,avgAvgSwc:22.8},{month:3,day:7,avg:.924,wmonth:6,norm:82.22,avgAvgSwc:23.07},{month:3,day:8,avg:.931,wmonth:6,norm:82.65,avgAvgSwc:23.19},{month:3,day:9,avg:.937,wmonth:6,norm:82.89,avgAvgSwc:23.25},{month:3,day:10,avg:.943,wmonth:6,norm:83.05,avgAvgSwc:23.22},{month:3,day:11,avg:.948,wmonth:6,norm:83.16,avgAvgSwc:23.31},{month:3,day:12,avg:.954,wmonth:6,norm:83.24,avgAvgSwc:23.33},{month:3,day:13,avg:.959,wmonth:6,norm:83.37,avgAvgSwc:23.36},{month:3,day:14,avg:.964,wmonth:6,norm:83.55,avgAvgSwc:23.43},{month:3,day:15,avg:.968,wmonth:6,norm:83.89,avgAvgSwc:23.55},{month:3,day:16,avg:.972,wmonth:6,norm:84.35,avgAvgSwc:23.69},{month:3,day:17,avg:.976,wmonth:6,norm:84.69,avgAvgSwc:23.8},{month:3,day:18,avg:.98,wmonth:6,norm:84.66,avgAvgSwc:23.8},{month:3,day:19,avg:.983,wmonth:6,norm:84.54,avgAvgSwc:23.77},{month:3,day:20,avg:.986,wmonth:6,norm:84.67,avgAvgSwc:23.72},{month:3,day:21,avg:.989,wmonth:6,norm:84.99,avgAvgSwc:23.94},{month:3,day:22,avg:.991,wmonth:6,norm:85.29,avgAvgSwc:24.07},{month:3,day:23,avg:.993,wmonth:6,norm:85.72,avgAvgSwc:24.2},{month:3,day:24,avg:.995,wmonth:6,norm:85.9,avgAvgSwc:24.28},{month:3,day:25,avg:.997,wmonth:6,norm:86.23,avgAvgSwc:24.38},{month:3,day:26,avg:.998,wmonth:6,norm:86.38,avgAvgSwc:24.44},{month:3,day:27,avg:.999,wmonth:6,norm:86.53,avgAvgSwc:24.49},{month:3,day:28,avg:1,wmonth:6,norm:86.76,avgAvgSwc:24.58},{month:3,day:29,avg:1,wmonth:6,norm:86.82,avgAvgSwc:24.63},{month:3,day:30,avg:1,wmonth:6,norm:86.69,avgAvgSwc:24.61},{month:3,day:31,avg:1,wmonth:6,norm:86.35,avgAvgSwc:24.57},{month:4,day:1,avg:.999,wmonth:7,norm:89.74,avgAvgSwc:25.33},{month:4,day:2,avg:.997,wmonth:7,norm:85.69,avgAvgSwc:24.4},{month:4,day:3,avg:.995,wmonth:7,norm:85.22,avgAvgSwc:24.3},{month:4,day:4,avg:.993,wmonth:7,norm:84.8,avgAvgSwc:24.19},{month:4,day:5,avg:.99,wmonth:7,norm:84.53,avgAvgSwc:24.1},{month:4,day:6,avg:.987,wmonth:7,norm:84.14,avgAvgSwc:24.02},{month:4,day:7,avg:.983,wmonth:7,norm:83.61,avgAvgSwc:23.87},{month:4,day:8,avg:.979,wmonth:7,norm:83.27,avgAvgSwc:23.76},{month:4,day:9,avg:.975,wmonth:7,norm:82.9,avgAvgSwc:23.64},{month:4,day:10,avg:.97,wmonth:7,norm:82.26,avgAvgSwc:23.46},{month:4,day:11,avg:.965,wmonth:7,norm:81.6,avgAvgSwc:23.25},{month:4,day:12,avg:.959,wmonth:7,norm:81.14,avgAvgSwc:23.13},{month:4,day:13,avg:.953,wmonth:7,norm:80.83,avgAvgSwc:23.03},{month:4,day:14,avg:.947,wmonth:7,norm:80.6,avgAvgSwc:22.97},{month:4,day:15,avg:.94,wmonth:7,norm:80.11,avgAvgSwc:22.82},{month:4,day:16,avg:.933,wmonth:7,norm:79.78,avgAvgSwc:22.72},{month:4,day:17,avg:.925,wmonth:7,norm:79.59,avgAvgSwc:22.66},{month:4,day:18,avg:.917,wmonth:7,norm:78.85,avgAvgSwc:22.43},{month:4,day:19,avg:.909,wmonth:7,norm:78.04,avgAvgSwc:22.16},{month:4,day:20,avg:.9,wmonth:7,norm:76.97,avgAvgSwc:21.85},{month:4,day:21,avg:.891,wmonth:7,norm:76.2,avgAvgSwc:21.6},{month:4,day:22,avg:.881,wmonth:7,norm:75.45,avgAvgSwc:21.37},{month:4,day:23,avg:.871,wmonth:7,norm:74.57,avgAvgSwc:21.12},{month:4,day:24,avg:.861,wmonth:7,norm:73.39,avgAvgSwc:20.79},{month:4,day:25,avg:.85,wmonth:7,norm:72.35,avgAvgSwc:20.51},{month:4,day:26,avg:.839,wmonth:7,norm:71.38,avgAvgSwc:20.29},{month:4,day:27,avg:.827,wmonth:7,norm:69.85,avgAvgSwc:19.86},{month:4,day:28,avg:.815,wmonth:7,norm:68.54,avgAvgSwc:19.51},{month:4,day:29,avg:.803,wmonth:7,norm:67.07,avgAvgSwc:19.11},{month:4,day:30,avg:.79,wmonth:7,norm:65.62,avgAvgSwc:18.7},{month:5,day:1,avg:.775,wmonth:8,norm:63.96,avgAvgSwc:18.22},{month:5,day:2,avg:.761,wmonth:8,norm:62.31,avgAvgSwc:17.8},{month:5,day:3,avg:.746,wmonth:8,norm:60.74,avgAvgSwc:17.35},{month:5,day:4,avg:.731,wmonth:8,norm:59.02,avgAvgSwc:16.87},{month:5,day:5,avg:.716,wmonth:8,norm:58.99,avgAvgSwc:16.95},{month:5,day:6,avg:.701,wmonth:8,norm:57.22,avgAvgSwc:16.45},{month:5,day:7,avg:.686,wmonth:8,norm:55.69,avgAvgSwc:16.03},{month:5,day:8,avg:.672,wmonth:8,norm:54.14,avgAvgSwc:15.58},{month:5,day:9,avg:.657,wmonth:8,norm:52.58,avgAvgSwc:15.13},{month:5,day:10,avg:.642,wmonth:8,norm:51.18,avgAvgSwc:14.76},{month:5,day:11,avg:.627,wmonth:8,norm:49.91,avgAvgSwc:14.41},{month:5,day:12,avg:.612,wmonth:8,norm:48.49,avgAvgSwc:14.02},{month:5,day:13,avg:.597,wmonth:8,norm:46.99,avgAvgSwc:13.6},{month:5,day:14,avg:.581,wmonth:8,norm:45.34,avgAvgSwc:13.13},{month:5,day:15,avg:.566,wmonth:8,norm:43.76,avgAvgSwc:12.69},{month:5,day:16,avg:.551,wmonth:8,norm:42.43,avgAvgSwc:12.28},{month:5,day:17,avg:.536,wmonth:8,norm:41.28,avgAvgSwc:11.95},{month:5,day:18,avg:.521,wmonth:8,norm:40.22,avgAvgSwc:11.66},{month:5,day:19,avg:.505,wmonth:8,norm:39.07,avgAvgSwc:11.35},{month:5,day:20,avg:.49,wmonth:8,norm:38.05,avgAvgSwc:10.99},{month:5,day:21,avg:.475,wmonth:8,norm:36.59,avgAvgSwc:10.65},{month:5,day:22,avg:.46,wmonth:8,norm:35.49,avgAvgSwc:10.36},{month:5,day:23,avg:.444,wmonth:8,norm:34.42,avgAvgSwc:10.04},{month:5,day:24,avg:.429,wmonth:8,norm:33.24,avgAvgSwc:9.73},{month:5,day:25,avg:.413,wmonth:8,norm:36.52,avgAvgSwc:10.68},{month:5,day:26,avg:.398,wmonth:8,norm:30.84,avgAvgSwc:9.07},{month:5,day:27,avg:.382,wmonth:8,norm:29.84,avgAvgSwc:8.79},{month:5,day:28,avg:.367,wmonth:8,norm:28.86,avgAvgSwc:8.5},{month:5,day:29,avg:.351,wmonth:8,norm:27.9,avgAvgSwc:8.24},{month:5,day:30,avg:.336,wmonth:8,norm:27.17,avgAvgSwc:7.95},{month:5,day:31,avg:.32,wmonth:8,norm:26.6,avgAvgSwc:7.62},{month:6,day:1,avg:.307,wmonth:9,norm:25.4,avgAvgSwc:7.25},{month:6,day:2,avg:.295,wmonth:9,norm:30.41,avgAvgSwc:8.72},{month:6,day:3,avg:.283,wmonth:9,norm:28.9,avgAvgSwc:8.29},{month:6,day:4,avg:.271,wmonth:9,norm:25.07,avgAvgSwc:7.2},{month:6,day:5,avg:.26,wmonth:9,norm:22.56,avgAvgSwc:6.46},{month:6,day:6,avg:.248,wmonth:9,norm:21.25,avgAvgSwc:6.09},{month:6,day:7,avg:.237,wmonth:9,norm:20.13,avgAvgSwc:5.76},{month:6,day:8,avg:.227,wmonth:9,norm:18.94,avgAvgSwc:5.43},{month:6,day:9,avg:.216,wmonth:9,norm:17.95,avgAvgSwc:5.14},{month:6,day:10,avg:.206,wmonth:9,norm:19.81,avgAvgSwc:5.71},{month:6,day:11,avg:.196,wmonth:9,norm:18.61,avgAvgSwc:5.38},{month:6,day:12,avg:.186,wmonth:9,norm:18.56,avgAvgSwc:5.37},{month:6,day:13,avg:.177,wmonth:9,norm:18.63,avgAvgSwc:5.42},{month:6,day:14,avg:.168,wmonth:9,norm:17.27,avgAvgSwc:5.01},{month:6,day:15,avg:.159,wmonth:9,norm:18.47,avgAvgSwc:5.4},{month:6,day:16,avg:.151,wmonth:9,norm:16.96,avgAvgSwc:4.99},{month:6,day:17,avg:.142,wmonth:9,norm:17.32,avgAvgSwc:5.11},{month:6,day:18,avg:.134,wmonth:9,norm:14.8,avgAvgSwc:4.35},{month:6,day:19,avg:.127,wmonth:9,norm:14.79,avgAvgSwc:4.37},{month:6,day:20,avg:.119,wmonth:9,norm:14.48,avgAvgSwc:4},{month:6,day:21,avg:.112,wmonth:9,norm:14.45,avgAvgSwc:4.01},{month:6,day:22,avg:.105,wmonth:9,norm:13.3,avgAvgSwc:3.66},{month:6,day:23,avg:.099,wmonth:9,norm:11.95,avgAvgSwc:3.28},{month:6,day:24,avg:.092,wmonth:9,norm:9.61,avgAvgSwc:2.64},{month:6,day:25,avg:.086,wmonth:9,norm:7.3,avgAvgSwc:2.01},{month:6,day:26,avg:.08,wmonth:9,norm:6.58,avgAvgSwc:1.82},{month:6,day:27,avg:.075,wmonth:9,norm:7.78,avgAvgSwc:2.14},{month:6,day:28,avg:.07,wmonth:9,norm:6.98,avgAvgSwc:1.92},{month:6,day:29,avg:.065,wmonth:9,norm:6.3,avgAvgSwc:1.73},{month:6,day:30,avg:.06,wmonth:9,norm:4.69,avgAvgSwc:1.29},{month:7,day:1,avg:.056,wmonth:10,norm:4.15,avgAvgSwc:1.15},{month:7,day:2,avg:.051,wmonth:10,norm:4.92,avgAvgSwc:1.35},{month:7,day:3,avg:.047,wmonth:10,norm:4.42,avgAvgSwc:1.2},{month:7,day:4,avg:.043,wmonth:10,norm:4.28,avgAvgSwc:1.19},{month:7,day:5,avg:.04,wmonth:10,norm:3.75,avgAvgSwc:1.05},{month:7,day:6,avg:.036,wmonth:10,norm:2.92,avgAvgSwc:.82},{month:7,day:7,avg:.033,wmonth:10,norm:2.91,avgAvgSwc:.8},{month:7,day:8,avg:.03,wmonth:10,norm:2.18,avgAvgSwc:.59},{month:7,day:9,avg:.027,wmonth:10,norm:1.66,avgAvgSwc:.45},{month:7,day:10,avg:.024,wmonth:10,norm:1.64,avgAvgSwc:.44},{month:7,day:11,avg:.021,wmonth:10,norm:1.39,avgAvgSwc:.39},{month:7,day:12,avg:.018,wmonth:10,norm:1.18,avgAvgSwc:.33},{month:7,day:13,avg:.016,wmonth:10,norm:1.17,avgAvgSwc:.32},{month:7,day:14,avg:.014,wmonth:10,norm:.96,avgAvgSwc:.25},{month:7,day:15,avg:.011,wmonth:10,norm:.79,avgAvgSwc:.22},{month:7,day:16,avg:.01,wmonth:10,norm:.71,avgAvgSwc:.19},{month:7,day:17,avg:.008,wmonth:10,norm:.52,avgAvgSwc:.14},{month:7,day:18,avg:.006,wmonth:10,norm:.35,avgAvgSwc:.09},{month:7,day:19,avg:.005,wmonth:10,norm:.29,avgAvgSwc:.05},{month:7,day:20,avg:.003,wmonth:10,norm:.23,avgAvgSwc:.05},{month:7,day:21,avg:.002,wmonth:10,norm:.11,avgAvgSwc:.06},{month:7,day:22,avg:.001,wmonth:10,norm:0,avgAvgSwc:.03},{month:7,day:23,avg:.001,wmonth:10,norm:0,avgAvgSwc:0},{month:7,day:24,avg:0,wmonth:10,norm:0,avgAvgSwc:0},{month:7,day:25,avg:0,wmonth:10,norm:0,avgAvgSwc:0},{month:7,day:26,avg:0,wmonth:10,norm:0,avgAvgSwc:0},{month:7,day:27,avg:0,wmonth:10,norm:0,avgAvgSwc:0},{month:7,day:28,avg:0,wmonth:10,norm:0,avgAvgSwc:0},{month:7,day:29,avg:0,wmonth:10,norm:0,avgAvgSwc:0},{month:7,day:30,avg:0,wmonth:10,norm:0,avgAvgSwc:0},{month:7,day:31,avg:0,wmonth:10,norm:0,avgAvgSwc:0},{month:8,day:1,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:2,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:3,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:4,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:5,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:6,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:7,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:8,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:9,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:10,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:11,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:12,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:13,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:14,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:15,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:16,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:17,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:18,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:19,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:20,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:21,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:22,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:23,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:24,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:25,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:26,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:27,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:28,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:29,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:30,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:8,day:31,avg:0,wmonth:11,norm:0,avgAvgSwc:0},{month:9,day:1,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:2,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:3,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:4,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:5,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:6,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:7,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:8,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:9,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:10,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:11,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:12,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:13,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:14,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:15,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:16,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:17,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:18,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:19,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:20,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:21,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:22,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:23,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:24,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:25,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:26,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:27,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:28,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:29,avg:0,wmonth:12,norm:0,avgAvgSwc:0},{month:9,day:30,avg:0,wmonth:12,norm:0,avgAvgSwc:0}],Ot=[{swcDate:"2021-10-20",numSta:107,pctApr1:1,pctNormal:100,avgSwc:.3},{swcDate:"2021-10-21",numSta:107,pctApr1:1,pctNormal:83,avgSwc:.3},{swcDate:"2021-10-22",numSta:106,pctApr1:1,pctNormal:77,avgSwc:.2},{swcDate:"2021-10-23",numSta:108,pctApr1:1,pctNormal:67,avgSwc:.2},{swcDate:"2021-10-24",numSta:108,pctApr1:1,pctNormal:63,avgSwc:.3},{swcDate:"2021-10-25",numSta:108,pctApr1:3,pctNormal:167,avgSwc:.9},{swcDate:"2021-10-26",numSta:103,pctApr1:7,pctNormal:350,avgSwc:1.9},{swcDate:"2021-10-27",numSta:105,pctApr1:7,pctNormal:318,avgSwc:1.9},{swcDate:"2021-10-28",numSta:104,pctApr1:6,pctNormal:250,avgSwc:1.8},{swcDate:"2021-10-29",numSta:106,pctApr1:6,pctNormal:231,avgSwc:1.6},{swcDate:"2021-10-30",numSta:106,pctApr1:5,pctNormal:179,avgSwc:1.4},{swcDate:"2021-10-31",numSta:105,pctApr1:4,pctNormal:133,avgSwc:1.2},{swcDate:"2021-11-01",numSta:105,pctApr1:4,pctNormal:121,avgSwc:1.1},{swcDate:"2021-11-02",numSta:105,pctApr1:4,pctNormal:111,avgSwc:1},{swcDate:"2021-11-03",numSta:105,pctApr1:3,pctNormal:77,avgSwc:.9},{swcDate:"2021-11-04",numSta:103,pctApr1:3,pctNormal:71,avgSwc:.8},{swcDate:"2021-11-05",numSta:105,pctApr1:3,pctNormal:67,avgSwc:.7},{swcDate:"2021-11-06",numSta:105,pctApr1:2,pctNormal:42,avgSwc:.7},{swcDate:"2021-11-07",numSta:105,pctApr1:2,pctNormal:38,avgSwc:.7},{swcDate:"2021-11-08",numSta:105,pctApr1:2,pctNormal:36,avgSwc:.7},{swcDate:"2021-11-09",numSta:105,pctApr1:4,pctNormal:68,avgSwc:1},{swcDate:"2021-11-10",numSta:105,pctApr1:4,pctNormal:63,avgSwc:1.1},{swcDate:"2021-11-11",numSta:105,pctApr1:4,pctNormal:60,avgSwc:1.1},{swcDate:"2021-11-12",numSta:105,pctApr1:4,pctNormal:57,avgSwc:1.1},{swcDate:"2021-11-13",numSta:105,pctApr1:4,pctNormal:53,avgSwc:1},{swcDate:"2021-11-14",numSta:105,pctApr1:3,pctNormal:38,avgSwc:1},{swcDate:"2021-11-15",numSta:105,pctApr1:3,pctNormal:36,avgSwc:.9},{swcDate:"2021-11-16",numSta:105,pctApr1:3,pctNormal:34,avgSwc:.9},{swcDate:"2021-11-17",numSta:105,pctApr1:3,pctNormal:33,avgSwc:.8},{swcDate:"2021-11-18",numSta:106,pctApr1:3,pctNormal:31,avgSwc:.8},{swcDate:"2021-11-19",numSta:106,pctApr1:3,pctNormal:30,avgSwc:.8},{swcDate:"2021-11-20",numSta:106,pctApr1:3,pctNormal:28,avgSwc:.8},{swcDate:"2021-11-21",numSta:106,pctApr1:3,pctNormal:27,avgSwc:.8},{swcDate:"2021-11-22",numSta:106,pctApr1:3,pctNormal:26,avgSwc:.9},{swcDate:"2021-11-23",numSta:106,pctApr1:3,pctNormal:25,avgSwc:1},{swcDate:"2021-11-24",numSta:106,pctApr1:4,pctNormal:32,avgSwc:1},{swcDate:"2021-11-25",numSta:106,pctApr1:4,pctNormal:30,avgSwc:1.1},{swcDate:"2021-11-26",numSta:106,pctApr1:4,pctNormal:29,avgSwc:1.1},{swcDate:"2021-11-27",numSta:106,pctApr1:4,pctNormal:28,avgSwc:1},{swcDate:"2021-11-28",numSta:106,pctApr1:3,pctNormal:20,avgSwc:1},{swcDate:"2021-11-29",numSta:106,pctApr1:3,pctNormal:19,avgSwc:.9},{swcDate:"2021-11-30",numSta:106,pctApr1:3,pctNormal:19,avgSwc:.9},{swcDate:"2021-12-01",numSta:107,pctApr1:3,pctNormal:18,avgSwc:.9},{swcDate:"2021-12-02",numSta:108,pctApr1:3,pctNormal:18,avgSwc:.9},{swcDate:"2021-12-03",numSta:108,pctApr1:3,pctNormal:17,avgSwc:.9},{swcDate:"2021-12-04",numSta:108,pctApr1:3,pctNormal:17,avgSwc:.9},{swcDate:"2021-12-05",numSta:108,pctApr1:3,pctNormal:16,avgSwc:1},{swcDate:"2021-12-06",numSta:108,pctApr1:3,pctNormal:16,avgSwc:.9},{swcDate:"2021-12-07",numSta:108,pctApr1:4,pctNormal:20,avgSwc:1},{swcDate:"2021-12-08",numSta:108,pctApr1:3,pctNormal:15,avgSwc:.9},{swcDate:"2021-12-09",numSta:108,pctApr1:4,pctNormal:19,avgSwc:1.1},{swcDate:"2021-12-10",numSta:108,pctApr1:5,pctNormal:23,avgSwc:1.3},{swcDate:"2021-12-11",numSta:108,pctApr1:5,pctNormal:23,avgSwc:1.4},{swcDate:"2021-12-12",numSta:108,pctApr1:5,pctNormal:22,avgSwc:1.5},{swcDate:"2021-12-13",numSta:163,pctApr1:19,pctNormal:83,avgSwc:5.3},{swcDate:"2021-12-14",numSta:107,pctApr1:18,pctNormal:76,avgSwc:5.1},{swcDate:"2021-12-15",numSta:106,pctApr1:20,pctNormal:83,avgSwc:5.7},{swcDate:"2021-12-16",numSta:106,pctApr1:24,pctNormal:97,avgSwc:6.8},{swcDate:"2021-12-17",numSta:105,pctApr1:25,pctNormal:98,avgSwc:7.1},{swcDate:"2021-12-18",numSta:197,pctApr1:28,pctNormal:107,avgSwc:7.9},{swcDate:"2021-12-19",numSta:105,pctApr1:26,pctNormal:97,avgSwc:7.3},{swcDate:"2021-12-20",numSta:104,pctApr1:26,pctNormal:95,avgSwc:7.3},{swcDate:"2021-12-21",numSta:104,pctApr1:26,pctNormal:93,avgSwc:7.3},{swcDate:"2021-12-22",numSta:104,pctApr1:26,pctNormal:91,avgSwc:7.4},{swcDate:"2021-12-23",numSta:104,pctApr1:30,pctNormal:102,avgSwc:8.4},{swcDate:"2021-12-24",numSta:104,pctApr1:36,pctNormal:120,avgSwc:10.3},{swcDate:"2021-12-25",numSta:104,pctApr1:40,pctNormal:130,avgSwc:11.2},{swcDate:"2021-12-26",numSta:104,pctApr1:46,pctNormal:146,avgSwc:12.9},{swcDate:"2021-12-27",numSta:104,pctApr1:49,pctNormal:153,avgSwc:13.8},{swcDate:"2021-12-28",numSta:104,pctApr1:52,pctNormal:159,avgSwc:14.7},{swcDate:"2021-12-29",numSta:104,pctApr1:53,pctNormal:158,avgSwc:14.9},{swcDate:"2021-12-30",numSta:104,pctApr1:55,pctNormal:160,avgSwc:15.4},{swcDate:"2021-12-31",numSta:103,pctApr1:55,pctNormal:157,avgSwc:15.4},{swcDate:"2022-01-01",numSta:103,pctApr1:55,pctNormal:154,avgSwc:15.4},{swcDate:"2022-01-02",numSta:103,pctApr1:55,pctNormal:150,avgSwc:15.5},{swcDate:"2022-01-03",numSta:103,pctApr1:55,pctNormal:147,avgSwc:15.5},{swcDate:"2022-01-04",numSta:102,pctApr1:56,pctNormal:147,avgSwc:15.7},{swcDate:"2022-01-05",numSta:102,pctApr1:56,pctNormal:144,avgSwc:15.8},{swcDate:"2022-01-06",numSta:102,pctApr1:57,pctNormal:144,avgSwc:15.8},{swcDate:"2022-01-07",numSta:102,pctApr1:57,pctNormal:141,avgSwc:15.8},{swcDate:"2022-01-08",numSta:102,pctApr1:57,pctNormal:138,avgSwc:15.9},{swcDate:"2022-01-09",numSta:102,pctApr1:57,pctNormal:135,avgSwc:16},{swcDate:"2022-01-10",numSta:102,pctApr1:57,pctNormal:133,avgSwc:16},{swcDate:"2022-01-11",numSta:102,pctApr1:57,pctNormal:130,avgSwc:16},{swcDate:"2022-01-12",numSta:102,pctApr1:57,pctNormal:128,avgSwc:16.1},{swcDate:"2022-01-13",numSta:102,pctApr1:58,pctNormal:128,avgSwc:16.1},{swcDate:"2022-01-14",numSta:101,pctApr1:58,pctNormal:126,avgSwc:16.2},{swcDate:"2022-01-15",numSta:102,pctApr1:58,pctNormal:123,avgSwc:16.1},{swcDate:"2022-01-16",numSta:102,pctApr1:58,pctNormal:121,avgSwc:16.1},{swcDate:"2022-01-17",numSta:102,pctApr1:58,pctNormal:119,avgSwc:16.1},{swcDate:"2022-01-18",numSta:102,pctApr1:58,pctNormal:117,avgSwc:16.1},{swcDate:"2022-01-19",numSta:102,pctApr1:58,pctNormal:115,avgSwc:16.1},{swcDate:"2022-01-20",numSta:101,pctApr1:58,pctNormal:113,avgSwc:16.1},{swcDate:"2022-01-21",numSta:102,pctApr1:58,pctNormal:111,avgSwc:16.1},{swcDate:"2022-01-22",numSta:102,pctApr1:58,pctNormal:109,avgSwc:16.1},{swcDate:"2022-01-23",numSta:102,pctApr1:58,pctNormal:108,avgSwc:16},{swcDate:"2022-01-24",numSta:102,pctApr1:58,pctNormal:106,avgSwc:16},{swcDate:"2022-01-25",numSta:102,pctApr1:58,pctNormal:104,avgSwc:16},{swcDate:"2022-01-26",numSta:102,pctApr1:58,pctNormal:103,avgSwc:16},{swcDate:"2022-01-27",numSta:103,pctApr1:58,pctNormal:101,avgSwc:16},{swcDate:"2022-01-28",numSta:104,pctApr1:58,pctNormal:99,avgSwc:16},{swcDate:"2022-01-29",numSta:104,pctApr1:58,pctNormal:98,avgSwc:16},{swcDate:"2022-01-30",numSta:104,pctApr1:57,pctNormal:95,avgSwc:16},{swcDate:"2022-01-31",numSta:104,pctApr1:57,pctNormal:93,avgSwc:15.9},{swcDate:"2022-02-01",numSta:104,pctApr1:58,pctNormal:93,avgSwc:16.2},{swcDate:"2022-02-02",numSta:104,pctApr1:58,pctNormal:92,avgSwc:16.1},{swcDate:"2022-02-03",numSta:103,pctApr1:58,pctNormal:90,avgSwc:16.1},{swcDate:"2022-02-04",numSta:103,pctApr1:58,pctNormal:89,avgSwc:16.1},{swcDate:"2022-02-05",numSta:102,pctApr1:58,pctNormal:88,avgSwc:16.1},{swcDate:"2022-02-06",numSta:103,pctApr1:58,pctNormal:86,avgSwc:16.1},{swcDate:"2022-02-07",numSta:103,pctApr1:58,pctNormal:85,avgSwc:16},{swcDate:"2022-02-08",numSta:103,pctApr1:58,pctNormal:84,avgSwc:16},{swcDate:"2022-02-09",numSta:103,pctApr1:57,pctNormal:81,avgSwc:15.9},{swcDate:"2022-02-10",numSta:102,pctApr1:57,pctNormal:80,avgSwc:15.9},{swcDate:"2022-02-11",numSta:102,pctApr1:57,pctNormal:79,avgSwc:15.8},{swcDate:"2022-02-12",numSta:102,pctApr1:56,pctNormal:77,avgSwc:15.7},{swcDate:"2022-02-13",numSta:103,pctApr1:56,pctNormal:76,avgSwc:15.6},{swcDate:"2022-02-14",numSta:103,pctApr1:55,pctNormal:73,avgSwc:15.5},{swcDate:"2022-02-15",numSta:103,pctApr1:55,pctNormal:72,avgSwc:15.4},{swcDate:"2022-02-16",numSta:103,pctApr1:55,pctNormal:72,avgSwc:15.4},{swcDate:"2022-02-17",numSta:103,pctApr1:55,pctNormal:71,avgSwc:15.4},{swcDate:"2022-02-18",numSta:103,pctApr1:55,pctNormal:70,avgSwc:15.4},{swcDate:"2022-02-19",numSta:103,pctApr1:55,pctNormal:69,avgSwc:15.3},{swcDate:"2022-02-20",numSta:103,pctApr1:55,pctNormal:68,avgSwc:15.3},{swcDate:"2022-02-21",numSta:103,pctApr1:55,pctNormal:68,avgSwc:15.2},{swcDate:"2022-02-22",numSta:103,pctApr1:55,pctNormal:67,avgSwc:15.3},{swcDate:"2022-02-23",numSta:102,pctApr1:56,pctNormal:68,avgSwc:15.6},{swcDate:"2022-02-24",numSta:103,pctApr1:56,pctNormal:67,avgSwc:15.6},{swcDate:"2022-02-25",numSta:104,pctApr1:56,pctNormal:66,avgSwc:15.7},{swcDate:"2022-02-26",numSta:104,pctApr1:56,pctNormal:66,avgSwc:15.7},{swcDate:"2022-02-27",numSta:104,pctApr1:56,pctNormal:65,avgSwc:15.8},{swcDate:"2022-02-28",numSta:104,pctApr1:56,pctNormal:64,avgSwc:15.8},{swcDate:"2022-03-01",numSta:103,pctApr1:56,pctNormal:64,avgSwc:15.8},{swcDate:"2022-03-02",numSta:102,pctApr1:56,pctNormal:63,avgSwc:15.8},{swcDate:"2022-03-03",numSta:102,pctApr1:56,pctNormal:63,avgSwc:15.8},{swcDate:"2022-03-04",numSta:102,pctApr1:56,pctNormal:62,avgSwc:15.7},{swcDate:"2022-03-05",numSta:101,pctApr1:56,pctNormal:62,avgSwc:15.8},{swcDate:"2022-03-06",numSta:102,pctApr1:57,pctNormal:62,avgSwc:15.9},{swcDate:"2022-03-07",numSta:102,pctApr1:57,pctNormal:62,avgSwc:16},{swcDate:"2022-03-08",numSta:102,pctApr1:57,pctNormal:61,avgSwc:16.1},{swcDate:"2022-03-09",numSta:102,pctApr1:57,pctNormal:61,avgSwc:16},{swcDate:"2022-03-10",numSta:102,pctApr1:57,pctNormal:60,avgSwc:16},{swcDate:"2022-03-11",numSta:102,pctApr1:57,pctNormal:60,avgSwc:16},{swcDate:"2022-03-12",numSta:100,pctApr1:56,pctNormal:59,avgSwc:15.9},{swcDate:"2022-03-13",numSta:100,pctApr1:56,pctNormal:58,avgSwc:15.8},{swcDate:"2022-03-14",numSta:100,pctApr1:56,pctNormal:58,avgSwc:15.8},{swcDate:"2022-03-15",numSta:99,pctApr1:55,pctNormal:57,avgSwc:15.5},{swcDate:"2022-03-16",numSta:99,pctApr1:55,pctNormal:57,avgSwc:15.4},{swcDate:"2022-03-17",numSta:99,pctApr1:54,pctNormal:55,avgSwc:15.3},{swcDate:"2022-03-18",numSta:98,pctApr1:54,pctNormal:55,avgSwc:15.1},{swcDate:"2022-03-19",numSta:98,pctApr1:53,pctNormal:54,avgSwc:14.8},{swcDate:"2022-03-20",numSta:98,pctApr1:53,pctNormal:54,avgSwc:14.9},{swcDate:"2022-03-21",numSta:98,pctApr1:53,pctNormal:54,avgSwc:14.9},{swcDate:"2022-03-22",numSta:98,pctApr1:52,pctNormal:52,avgSwc:14.5},{swcDate:"2022-03-23",numSta:98,pctApr1:50,pctNormal:50,avgSwc:14},{swcDate:"2022-03-24",numSta:99,pctApr1:47,pctNormal:47,avgSwc:13.2},{swcDate:"2022-03-25",numSta:98,pctApr1:45,pctNormal:45,avgSwc:12.6},{swcDate:"2022-03-26",numSta:98,pctApr1:43,pctNormal:43,avgSwc:11.9},{swcDate:"2022-03-27",numSta:99,pctApr1:40,pctNormal:40,avgSwc:11.2},{swcDate:"2022-03-28",numSta:99,pctApr1:38,pctNormal:38,avgSwc:10.7},{swcDate:"2022-03-29",numSta:98,pctApr1:38,pctNormal:38,avgSwc:10.7},{swcDate:"2022-03-30",numSta:99,pctApr1:38,pctNormal:38,avgSwc:10.7},{swcDate:"2022-03-31",numSta:99,pctApr1:38,pctNormal:38,avgSwc:10.5},{swcDate:"2022-04-01",numSta:99,pctApr1:37,pctNormal:37,avgSwc:10.3},{swcDate:"2022-04-02",numSta:98,pctApr1:35,pctNormal:35,avgSwc:9.7},{swcDate:"2022-04-03",numSta:99,pctApr1:33,pctNormal:33,avgSwc:9.3},{swcDate:"2022-04-04",numSta:99,pctApr1:32,pctNormal:32,avgSwc:8.9},{swcDate:"2022-04-05",numSta:100,pctApr1:30,pctNormal:30,avgSwc:8.5},{swcDate:"2022-04-06",numSta:99,pctApr1:29,pctNormal:29,avgSwc:8.1},{swcDate:"2022-04-07",numSta:99,pctApr1:27,pctNormal:27,avgSwc:7.6},{swcDate:"2022-04-08",numSta:100,pctApr1:26,pctNormal:27,avgSwc:7.2},{swcDate:"2022-04-09",numSta:100,pctApr1:24,pctNormal:25,avgSwc:6.7},{swcDate:"2022-04-10",numSta:100,pctApr1:22,pctNormal:23,avgSwc:6.3},{swcDate:"2022-04-11",numSta:100,pctApr1:21,pctNormal:22,avgSwc:6},{swcDate:"2022-04-12",numSta:98,pctApr1:23,pctNormal:24,avgSwc:6.5},{swcDate:"2022-04-13",numSta:98,pctApr1:23,pctNormal:24,avgSwc:6.5},{swcDate:"2022-04-14",numSta:98,pctApr1:24,pctNormal:25,avgSwc:6.6},{swcDate:"2022-04-15",numSta:98,pctApr1:25,pctNormal:27,avgSwc:7.1},{swcDate:"2022-04-16",numSta:97,pctApr1:26,pctNormal:28,avgSwc:7.2},{swcDate:"2022-04-17",numSta:98,pctApr1:28,pctNormal:30,avgSwc:7.7},{swcDate:"2022-04-18",numSta:98,pctApr1:27,pctNormal:29,avgSwc:7.6},{swcDate:"2022-04-19",numSta:98,pctApr1:27,pctNormal:30,avgSwc:7.5},{swcDate:"2022-04-20",numSta:97,pctApr1:27,pctNormal:30,avgSwc:7.6},{swcDate:"2022-04-21",numSta:97,pctApr1:28,pctNormal:31,avgSwc:7.8},{swcDate:"2022-04-22",numSta:98,pctApr1:31,pctNormal:35,avgSwc:8.8},{swcDate:"2022-04-23",numSta:98,pctApr1:32,pctNormal:37,avgSwc:8.9},{swcDate:"2022-04-24",numSta:98,pctApr1:31,pctNormal:36,avgSwc:8.7},{swcDate:"2022-04-25",numSta:98,pctApr1:30,pctNormal:35,avgSwc:8.5},{swcDate:"2022-04-26",numSta:97,pctApr1:29,pctNormal:35,avgSwc:8},{swcDate:"2022-04-27",numSta:97,pctApr1:27,pctNormal:33,avgSwc:7.6},{swcDate:"2022-04-28",numSta:98,pctApr1:27,pctNormal:33,avgSwc:7.6},{swcDate:"2022-04-29",numSta:99,pctApr1:27,pctNormal:34,avgSwc:7.5},{swcDate:"2022-04-30",numSta:99,pctApr1:25,pctNormal:32,avgSwc:7.2},{swcDate:"2022-05-01",numSta:99,pctApr1:24,pctNormal:31,avgSwc:6.8},{swcDate:"2022-05-02",numSta:99,pctApr1:23,pctNormal:30,avgSwc:6.4},{swcDate:"2022-05-03",numSta:99,pctApr1:22,pctNormal:29,avgSwc:6.1},{swcDate:"2022-05-04",numSta:99,pctApr1:20,pctNormal:27,avgSwc:5.7}],zt="STATE",jt="OK",q={avg:Bt,swe:Ot,section:zt,status:jt};var ht=class extends z{constructor(){super(dt,lt)}connectedCallback(){let a=this.shadowRoot.querySelector("#snowpack-graph"),t=this.shadowRoot.querySelector(".popover-container"),n=this.dataset.locale||"en-US",e=this.dataset.historicPeakLabel||"Historic peak",o=20,i=182,s=365,m=175,u=145,A=u-o,S=q.swe.sort((h,y)=>h.swcDate>y.swcDate)[0],N=S?new Date(S.swcDate).getFullYear():new Date().getFullYear(),c=new Date(`${N}-10-01`),g=1e3*60*60*24,v=q.avg.reduce((h,y,$)=>{if(y.month===2&&y.day===29)return h;let k=$,_=Math.round(o+(A-A*y.avg));return h.push(`L${k},${_}`),h},[]),l=q.swe.reduce((h,y,$)=>{let k=new Date(y.swcDate);if(k.getMonth()===2&&k.getDate()===29)return h;let _=k-c+(c.getTimezoneOffset()-k.getTimezoneOffset())*60*1e3,R=Math.floor(_/g),I=Math.round(o+(A-A*(y.pctApr1/100)));return h.push([R,I]),h},[]),p=q.swe.length?new Date(Math.min(...q.swe.map(h=>new Date(h.swcDate)))).getFullYear():new Date().getFullYear();[11,1,3,5,7,9].forEach((h,y)=>{let $=this.shadowRoot.querySelector(`#snowpack-month-${h}`),k=h===11?p:p+1,_=y<2?{month:"short",year:"2-digit"}:{month:"short"},R=String(h).padStart(2,"0"),I=new Date(`${k}-${R}-02`).toLocaleDateString(n,_);$.innerHTML=I});let d=document.createElementNS("http://www.w3.org/2000/svg","path");d.setAttribute("d",`M0,${u} ${v.join(" ")} z`),d.classList.add("avg"),a.append(d);let w=document.createElementNS("http://www.w3.org/2000/svg","path"),b=l.map(([h,y])=>`L${h},${y}`).join(" ");w.setAttribute("d",`M0,${u} ${b}`),w.classList.add("current"),a.append(w);let f=document.createElementNS("http://www.w3.org/2000/svg","circle"),[[M,C]]=l.slice(-1);f.setAttribute("cx",M),f.setAttribute("cy",C),f.setAttribute("r","4"),f.classList.add("current-terminus"),a.append(f);let x=document.createElementNS("http://www.w3.org/2000/svg","circle");x.setAttribute("cx",M),x.setAttribute("cy",C),x.setAttribute("r","12"),x.setAttribute("id","current-terminus-hover-target"),a.append(x);let Y=this.querySelector("#snowpack-current-header").innerHTML,pt=this.querySelector(".snowpack-current").innerHTML,wt=this.buildPopOverElement({container:t,x:`${(M+15)/s*100}%`,y:`${C/m*100}%`,content:pt,legendText:Y,legendSvg:`
        <svg width="26" height="13" viewBox="0 0 26 13" aria-hidden="true">
          <line x1="0" y1="7" x2="26" y2="7" stroke-linecap="round" class="current" />
        </svg>
      `});this.setUpPopOvers(wt,x);let L=document.createElementNS("http://www.w3.org/2000/svg","text");L.setAttribute("x",i-12),L.setAttribute("y",o),L.setAttribute("dominant-baseline","middle"),L.setAttribute("text-anchor","end"),L.innerHTML=e,a.append(L);let H=document.createElementNS("http://www.w3.org/2000/svg","circle");H.setAttribute("cx",i),H.setAttribute("cy",o),H.setAttribute("r","4"),H.classList.add("peak"),a.append(H);let E=document.createElementNS("http://www.w3.org/2000/svg","circle");E.setAttribute("cx",i),E.setAttribute("cy",o),E.setAttribute("r","12"),E.setAttribute("id","historic-peak-hover-target"),a.append(E);let ut=this.querySelector("#snowpack-historic-header").innerHTML,St=this.querySelector(".snowpack-historic").innerHTML,yt=this.buildPopOverElement({container:t,x:`${(i+15)/s*100}%`,y:`${o/m*100}%`,content:St,legendText:ut,legendSvg:`
        <svg width="13" height="13" viewBox="0 0 10 10" aria-hidden="true">
          <circle r="4" cx="5" cy="5" class="peak" />
        </svg>
      `});this.setUpPopOvers(yt,E)}};window.customElements.define("drought-snowpack-levels",ht);function j(r,a,t="click"){typeof ga<"u"?(ga("send","event",t,r,a),ga("tracker2.send","event",t,r,a)):setTimeout(function(){j(r,a,t)},500)}function V(){console.log("Setting up analytics"),document.querySelectorAll("cagov-accordion").forEach(r=>{r.addEventListener("click",function(){this.querySelector(".accordion-title")&&j("accordion",this.querySelector(".accordion-title").textContent.trim())})}),document.querySelectorAll("a").forEach(r=>{r.href.indexOf(window.location.hostname)>-1||r.href.indexOf("drought.ca.gov")>-1?r.href.indexOf(".pdf")>-1&&r.addEventListener("click",function(){j("pdf",this.href.split(window.location.hostname)[1])}):r.addEventListener("click",function(){j("offsite",this.href)})})}window.onload=r=>{V()};
