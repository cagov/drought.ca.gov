const fs = require("fs");
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");

const { renderPostLists } = require("./src/components/post-list/render");

const {
  getHeadMetaTags,
  replaceUrl
  // chooseTemplate,
} = require("./src/templates/_data/meta.js");

const odiPublishing = require("./odi-publishing/config.js");
const config = odiPublishing.getConfig(); // @TODO set branch in this file

module.exports = function (eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    watch: true,
    notify: true,
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // DEPRECATING, remove when confirmed OK
  const replaceContent = (item, searchValue, replaceValue) => {
    item.template.frontMatter.content =
      item.template.frontMatter.content.replace(searchValue, replaceValue);
  };

  // @TODO can we rename "manualcontent" and document how this system works. @DOCS
  eleventyConfig.addCollection("manualcontent", function (collection) {
    let output = [];
    collection.getAll().forEach((item) => {
      if (item.data.wordpress.dataset) {
        let replaceUrls = config.build.replace_urls;

        replaceUrls.map((replacement) => {
          item.data.wordpress.content = replaceUrl(
            item.data.wordpress.content,
            replacement,
            config.build.static_site_url + "/"
          );
        });

        // Set up fields for passing into template
        item.data.templatestring = item.data.wordpress.dataset.data.template; // Load page template
        // @TODO Rename templatestring to page_template_name or something more descriptive. "template" is too generic.
        // item.data.templatestring = chooseTemplate(item.data.wordpress.dataset.data); // @ISSUE naming convention

        item.data.title = item.data.wordpress.dataset.data.title; // Get title @REVIEW
        item.data.og_meta = item.data.wordpress.dataset.data.og_meta; // Get head tags
        item.data.category = item.data.wordpress.dataset.data.category; // @ISSUE make sure this is right & handle if category is multiple fields
        item.data.id = item.data.wordpress.dataset.data.id; // @DOCS how are we using this ID?

        // Add and correct meta content fields that are used in index.njk head tags.
        item = getHeadMetaTags(item);

        // Change any links pointing to wp-content/uploads to the /media folder
        item.data.wordpress.content = replaceUrl(
          item.data.wordpress.content,
          "/wp-content/uploads/", // @TODO connect to configs when we are ready.
          "/media/"
        );

        // Fix all hard-coded source domains in meta content that point to wp-content/uploads. 
        // Change to media folder.
        // This Needs to come after head tags are set up.
        // @ISSUE locations are different from cannabis.ca.gov media folder location. This is confusing.
        Object.keys(item.data.og_meta).map((meta) => {
          if (typeof item.data.og_meta[meta] === "string") {
            item.data.og_meta[meta] = replaceUrl(
              item.data.og_meta[meta],
              "/wp-content/uploads/", // @TODO connect to configs when we are ready.
              "/media/"
            );
          }
        });
      }
      // Make data available to templating system.
      output.push(item);
    });

    return output;
  });

  // @DOCS Please add a note about what's happening here.
  eleventyConfig.addTransform("renderPostLists", function (html, outputPath) {
    // outputPath === false means serverless templates
    if (!outputPath || outputPath.endsWith(".html")) {
      if (html.includes("cagov-post-list")) {
        html = renderPostLists(html);
      }
    }
    return html;
  });

  // @ISSUE Add events rendering @TODO

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Copy assets and content folders into generated static site content.
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "dist/*": "/" });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "src/templates", // @ISSUE: this is different from cannabis.ca.gov. Is confusing.
      output: "docs",
    },
  };
};
