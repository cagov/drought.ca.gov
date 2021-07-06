const fs = require('fs');

module.exports = function() {
  return new Promise((resolve, reject) => {
    let wordPressArray = [];
    let fileNameMap = new Map();
    fs.readdir('wordpress/pages/', (err, files) => {
      files.forEach(file => {
        let loc = 'wordpress/pages/'+file;
        processFile(file, fileNameMap, loc);
      });

      fs.readdir('wordpress/posts/', (err, files) => {
        files.forEach(file => {
          let loc = 'wordpress/posts/'+file;
          processFile(file, fileNameMap, loc);
        });
        for (let [key, value] of fileNameMap) {
          wordPressArray.push(value);
        }
        resolve(wordPressArray);  
      });
    });
  });
};

function processFile(file, fileNameMap, loc) {
  let fileName = file.split('.')[0];
  let fileDetails = fileNameMap.get(fileName);
  if(!fileDetails) {
    fileDetails = {};
  }
  if(file.indexOf('.html') > -1) {
    fileDetails.filename = file.replace('.html','');
    fileDetails.content = fs.readFileSync(loc,'utf8');
  }
  if(file.indexOf('.json') > -1) {
    fileDetails.filename = file.replace('.json','');
    let fileData = JSON.parse(fs.readFileSync(loc,'utf8'));
    fileDetails.dataset = fileData;
    fileDetails.dataset.data.wordpress_url = cleanUrl(fileData.data.wordpress_url);
    // console.log("fileData.data", fileData.data);
    fileDetails.dataset.data.template = chooseTemplate(fileData.data.design_system_fields.template);
  }
  fileNameMap.set(fileName,fileDetails);
}

function cleanUrl (url) {
  if(url.indexOf('.pantheonsite.io/') > -1) {
    return url.split('.pantheonsite.io/')[1]
  }
  return url;
}

function chooseTemplate(template) {
  console.log("template", template);
  // if(!template) {
  //   return 'page';
  // }
  return template;
}