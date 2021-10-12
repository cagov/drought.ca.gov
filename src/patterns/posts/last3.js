const fs = require("fs");
const wordpress = require("./wordpress");

module.exports = function () {
  let wordPressArray = [];
  let files = fs.readdirSync('wordpress/posts/');
  files.forEach((file) => {
    if(file.indexOf('.json') > -1) {
      let loc = "wordpress/posts/" + file;
      wordPressArray.push(JSON.parse(fs.readFileSync(loc, "utf8")))  
    }
  });
  return wordPressArray.sort((a,b) => {
    if (a.data.date < b.data.date) {
      return -1;
    }
    if (a.data.date > b.data.date) {
      return 1;
    }
    return 0;
  }).slice(Math.max(wordPressArray.length - 3, 0));
};
