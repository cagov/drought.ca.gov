// fetch header, footer and content menus

/**
 * Is this a duplicate @ISSUE.
 */
const fetch = require("node-fetch");
// @TODO this should come from odi-publishing.json @ISSUE
let urlBase = "https://drought.ca.gov/wp-json/menus/v1/menus";
module.exports = function () {
  return new Promise((resolve, reject) => {
    fetch(urlBase)
      .then((res) => res.json())
      .then((json) => {
        let idsToRetrieve = [];
        let desiredSlugs = ["content-menu", "footer-menu", "header-menu"];
        json.forEach((item) => {
          if (desiredSlugs.includes(item.slug)) {
            idsToRetrieve.push(item.term_id);
          }
        });
        Promise.all(
          idsToRetrieve.map((id) =>
            fetch(`${urlBase}/${id}`).then((e) => e.json())
          )
        ).then((data) => {
          resolve(reformat(data));
        });
      });
  });
};

function reformat(data) {
  let outputObj = {};
  data.forEach((d) => {
    outputObj[d.slug] = d;
  });
  return outputObj;
}
