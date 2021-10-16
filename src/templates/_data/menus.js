// fetch header, footer and content menus

const fetch = require('node-fetch')
let urlBase = 'https://live-drought-ca-gov.pantheonsite.io/wp-json/menus/v1/menus'; // @TODO use config @ISSUE
module.exports = function () {
  return new Promise((resolve, reject) => {
    fetch(urlBase)
      .then(res => res.json())
      .then(json => {
        let idsToRetrieve = [];
        let desiredSlugs = ['content-menu', 'state-wide-footer-menu', 'header-menu', 'social-media-links-menu'];
        
        json.forEach(item => {
          // console.log('item', item);
          if (desiredSlugs.includes(item.slug)) {
            idsToRetrieve.push(item.term_id)
          }
        })
        Promise.all(
          idsToRetrieve.map(id =>
            fetch(`${urlBase}/${id}`)
              .then(e => e.json())
          )
        ).then(data => {
          resolve(reformat(data));
        });
      });
  });
};

function reformat(data) {
  let outputObj = {};
  data.forEach(d => {
    outputObj[d.slug] = d;
  })
  // console.log(outputObj);
  return outputObj;
}