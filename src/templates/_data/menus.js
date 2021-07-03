// fetch header, footer and content menus

const fetch = require('node-fetch')
let urlBase = 'https://dev-drought-ca-gov.pantheonsite.io/wp-json/menus/v1/menus';
module.exports = function () {
  return new Promise((resolve, reject) => {
    fetch(urlBase)
      .then(res => res.json())
      .then(json => {
        let idsToRetrieve = [];
        let desiredSlugs = ['content-menu', 'footer-menu', 'header-menu']
        json.forEach(item => {
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
  return outputObj;
}