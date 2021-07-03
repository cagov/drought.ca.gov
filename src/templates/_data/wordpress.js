const fs = require('fs');

module.exports = function() {
  return new Promise((resolve, reject) => {
    let wordPressArray = [];
    fs.readdir('wordpress/pages/', (err, files) => {
      let newObj = {};
      files.forEach(file => {
        if(file.indexOf('.html') > -1) {
          newObj = {};
          newObj.filename = file.replace('.html','');
          newObj.content = fs.readFileSync('wordpress/pages/'+file,'utf8');
        }
        if(file.indexOf('.json') > -1) {
          newObj.filename = file.replace('.json','');
          let fileData = JSON.parse(fs.readFileSync('wordpress/pages/'+file,'utf8'));
          newObj.dataset = fileData;
          newObj.dataset.data.wordpress_url = cleanUrl(fileData.data.wordpress_url);

          newObj.dataset.data.template = chooseTemplate(fileData.data.template);
          wordPressArray.push(newObj);
        }
      });
      resolve(wordPressArray);  
    });
  });
};

function cleanUrl (url) {
  if(url.indexOf('.pantheonsite.io/') > -1) {
    return url.split('.pantheonsite.io/')[1]
  }
  return url;
}

function chooseTemplate(template) {
  if(template && template.indexOf('template-page-landing.php') > -1) {
    return 'home';
  }
  return 'page'
}