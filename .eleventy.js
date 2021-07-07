const fs = require('fs');
const CleanCSS = require("clean-css");

const wordpressEditor = "https://live-drought-ca-gov.pantheonsite.io";
const wordpressEditorApi = "https://live-drought-ca-gov.pantheonsite.io";
const wordpressEditorMediaFiles = "https://live-drought-ca-gov.pantheonsite.io";
// const SITE_DOMAIN = process.env.SITE_DOMAIN !== undefined ? process.env.SITE_DOMAIN : "";
const SITE_DOMAIN = ""; // Relative links only for local images in display.
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "http://staging.drought.ca.gov.s3-website-us-west-1.amazonaws.com";
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://d24fehwpk146d4.cloudfront.net/media/";
const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://live-drought-ca-gov.pantheonsite.io/wp-content/uploads/";

const replacementPaths = {
  // api: {
  //   src: "https://live-drought-ca-gov.pantheonsite.io/wp-json/wp/v2/",
  //   target: "/api/",
  // }, // Still thinking about this
  media: {
    src: "https://live-drought-ca-gov.pantheonsite.io/wp-content/uploads/",
    target: "/media/",
    targetPermalink: `${SITE_DOMAIN}/media/`,
    targetPermalinkOGTags: `${DEFAULT_SITE_DOMAIN_OG_TAGS}`,
    targetPermalinkTest: "https://github.com/cagov/drought.ca.gov/raw/main/wordpress/media/"
  },
};

module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  const replaceContent = (item,searchValue,replaceValue) => {
    item.template.frontMatter.content = item.template.frontMatter.content
      .replace(searchValue,replaceValue);
  }
  
  eleventyConfig.addCollection("manualcontent", function(collection) {
    let output = [];
    collection.getAll().forEach(item => {
      if(item.data.wordpress.dataset) {
        // Set up fields for passing into template
        item.data.title = item.data.wordpress.dataset.data.title;
        item.data.templatestring = item.data.wordpress.dataset.data.template;
        item.data.page_meta = item.data.wordpress.dataset.data.page_meta;
        item.data.category = item.data.wordpress.dataset.data.category;
        item.data.id = item.data.wordpress.dataset.data.id;

        // let apiString = new RegExp('\\' + replacementPaths.api.src, 'gi');
        let mediaString = new RegExp('\\' + replacementPaths.media.src, 'g');
        item.data.wordpress.content = item.data.wordpress.content.replace(mediaString,replacementPaths.media.targetPermalink);

        // item.data.page_meta.og_meta = item.data.page_meta.og_meta.replace(mediaString,replacementPaths.media.targetPermalinkOGTags);
        
        item.data.page_meta.og_meta = item.data.page_meta.og_meta.replace(/Untitled \&\#x2d\; /g, ""); // Seeing if we can test in card debugger
      }
      output.push(item);
    });

    return output;
  });
 
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css/index.css.map": "index.css.map" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "src/templates",
      output: "docs",
    }
  };
}