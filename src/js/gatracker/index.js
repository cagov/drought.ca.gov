// setupAnalytics

function reportGA(eventAction, eventLabel, eventCategory = 'click') {
    if(typeof(ga) !== 'undefined') {
      ga('send', 'event', eventCategory, eventAction, eventLabel);
      //   ga('tracker2.send', 'event', eventCategory, eventAction, eventLabel);
      //   ga('tracker3.send', 'event', eventCategory, eventAction, eventLabel);
    } else {
      setTimeout(function() {
        reportGA(eventAction, eventLabel, eventCategory);
      }, 500);
    }
  }


export default function setupAnalytics() {
    console.log("Setting up analytics");

    document.querySelectorAll('cagov-accordion').forEach((acc) => {
        acc.addEventListener('click',function() {
          if(this.querySelector('.accordion-title')) {
            reportGA('accordion', this.querySelector('.accordion-title').textContent.trim())
          }
        });
      });
    
      document.querySelectorAll('a').forEach((a) => {
        // look for and track offsite and pdf links
        if(a.href.indexOf(window.location.hostname) > -1 || a.href.indexOf('drought.ca.gov') > -1) {
          if(a.href.indexOf('.pdf') > -1) {
            a.addEventListener('click',function() {
              reportGA('pdf', this.href.split(window.location.hostname)[1])
            });    
          }
        } else {
          // console.log("Adding offsite link handler:",window.location.hostname,a.href);
          a.addEventListener('click',function() {
            reportGA('offsite', this.href)
          })
        }
      });
    

}
