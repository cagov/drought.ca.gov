const sharp = require('sharp');

const image = sharp('src/assets/img/WGS84.png');

module.exports = () => 
  image
    .metadata()
    .then((metadata) => 
      image
        .resize({ 
          width: Math.round((metadata.width * .8) / 4),
          height: Math.round(metadata.height / 4),
          fit: 'fill'
        })
        .toFile('src/assets/img/WGS84.sized.png')
    );

