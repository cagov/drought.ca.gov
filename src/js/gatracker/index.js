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
}
