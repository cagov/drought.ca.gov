const sharp = require('sharp');

const image = sharp('src/components/spei-map/WGS84.png');

// The raw image has a strange projection that makes the state of California very wide.
// We need to squish the width by 80% to make the geography look more familiar.
// We'll also reduce the dimensions by 3/4.
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

