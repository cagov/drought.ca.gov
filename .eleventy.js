const fs = require('fs');
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");

const { renderPostLists } = require('./src/components/post-list/render');
const { getHeadMetaTags, replaceUrl } = require('./src/templates/_data/meta.js');

const wordpressEditor = "https://live-drought-ca-gov.pantheonsite.io";
const wordpressEditorApi = "https://live-drought-ca-gov.pantheonsite.io";
const wordpressEditorMediaFiles = "https://live-drought-ca-gov.pantheonsite.io";
// const SITE_DOMAIN = process.env.SITE_DOMAIN !== undefined ? process.env.SITE_DOMAIN : "";
const SITE_DOMAIN = ""; // Relative links only for local images in display.
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "http://staging.drought.ca.gov.s3-website-us-west-1.amazonaws.com/media/";
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://d24fehwpk146d4.cloudfront.net/media/";
const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://drought.ca.gov/media/";
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://live-drought-ca-gov.pantheonsite.io/wp-content/uploads/"; // Test with original image (not cached)

const replacementPaths = {
  media: {
    src: "https://live-drought-ca-gov.pantheonsite.io/wp-content/uploads/",
    target: "/media/",
    targetPermalink: `${SITE_DOMAIN}/media/`,
    targetPermalinkOGTags: `${DEFAULT_SITE_DOMAIN_OG_TAGS}`,
    targetPermalinkTest: "https://github.com/cagov/drought.ca.gov/raw/main/wordpress/media/"
  },
};

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    watch:true,
    notify:true,
 });

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
        item.data.templatestring = item.data.wordpress.dataset.data.template;

        item.data.title = item.data.wordpress.dataset.data.title;
        item.data.og_meta = item.data.wordpress.dataset.data.og_meta;
        item.data.category = item.data.wordpress.dataset.data.category;
        item.data.id = item.data.wordpress.dataset.data.id;


        // Fix any URL paths.
        // let mediaString = new RegExp('\\' + replacementPaths.media.src, 'g');
        // item.data.wordpress.content = item.data.wordpress.content.replace(mediaString,replacementPaths.media.targetPermalink);
        // try {
        //   item.data.page_meta.image.url[0] = item.data.page_meta.image.url[0] !== "" ? item.data.page_meta.image.url[0].replace(mediaString,replacementPaths.media.targetPermalinkOGTags) : "";
        // } catch (error) {
        //   // console.error(error);
        // }

        // @ISSUE Content editors hardcoding WP to the 11ty build configuration
        item.template.frontMatter.content = replaceUrl(
          item.template.frontMatter.content,
          "https://drought.ca.gov/media/",
          "/wp-content/uploads/"
        );

        let replaceUrls = [
          "http://drought.ca.gov/",
          "https://drought.ca.gov/",
          "https://test-drought-ca-gov.pantheonsite.io/",
        ];
        item.template.frontMatter.content = replaceUrl(
          item.template.frontMatter.content,
          replaceUrls[0],
          "/"
        );
        item.template.frontMatter.content = replaceUrl(
          item.template.frontMatter.content,
          replaceUrls[1],
          "/"
        );
        item.template.frontMatter.content = replaceUrl(
          item.template.frontMatter.content,
          replaceUrls[2],
          "/"
        );

        item = getHeadMetaTags(item);
        const jsonData = item.data.wordpress.dataset.data;

        if (jsonData.media) {
          const featuredMedia = jsonData.media.find((x) => x.featured);
          if (featuredMedia) {
            item.data.previewimage = "/wp-content/uploads/" + featuredMedia.path;
          }
      
          jsonData.media
            .filter((x) => x.source_url_match)
            .forEach((m) => {
              // replaceContent(item,new RegExp(m.source_url,'g'),'/'+wordpressImagePath+'/'+m.path);
              // item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp(m.source_url,'g'),'/media/'+m.path);
            });
        }

       
      }
      output.push(item);
    });

    return output;
  });

  eleventyConfig.addTransform("renderPostLists", function(html, outputPath) {
    //outputPath === false means serverless templates
    if ((!outputPath || outputPath.endsWith(".html"))) {
      if (html.includes('cagov-post-list')) {
        html = renderPostLists(html);
      }
    }

    return html;
  });
  
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
 
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "dist/*": "/" });

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