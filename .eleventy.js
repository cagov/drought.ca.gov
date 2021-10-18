const fs = require("fs");
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");

const { renderPostLists } = require("./src/components/post-list/render");
const {
  getHeadMetaTags,
  replaceUrl,
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

  const replaceContent = (item, searchValue, replaceValue) => {
    item.template.frontMatter.content =
      item.template.frontMatter.content.replace(searchValue, replaceValue);
  };

  eleventyConfig.addCollection("manualcontent", function (collection) {
    let output = [];
    collection.getAll().forEach((item) => {
      if (item.data.wordpress.dataset) {
        let replaceUrls = config.build.replace_urls;

        replaceUrls.map((replacement) => {
          // console.log(" item.wordpress.content",  item.data.wordpress.content);
          item.data.wordpress.content = replaceUrl(
            item.data.wordpress.content,
            replacement,
            config.build.static_site_url + "/"
          );
        });

        // Set up fields for passing into template
        item.data.templatestring = item.data.wordpress.dataset.data.template; // Load page template 
        // item.data.templatestring = chooseTemplate(item.data.wordpress.dataset.data); // @ISSUE naming convention

        item.data.title = item.data.wordpress.dataset.data.title; // Get title @REVIEW
        item.data.og_meta = item.data.wordpress.dataset.data.og_meta; // Get head tags
        item.data.category = item.data.wordpress.dataset.data.category; // @ISSUE make sure this is right & handle if category is multiple fields
        item.data.id = item.data.wordpress.dataset.data.id; // @DOCS how are we using this ID?

        item = getHeadMetaTags(item);

        // console.log(" item.wordpress.content",  item.data.wordpress.content);
        item.data.wordpress.content = replaceUrl(
          item.data.wordpress.content,
          "/wp-content/uploads/", // @TODO connect to configs when we are ready.
          "/media/"
        );

        // Fix all hard-coded source domains in meta content that point to wp-content/uploads.Changed to media folder. 
        // This Needs to come after head tags are set up.
        // @ISSUE locations are different from cannabis.ca.gov media folder location.
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
      output.push(item);
    });

    return output;
  });

  eleventyConfig.addTransform("renderPostLists", function (html, outputPath) {
    //outputPath === false means serverless templates
    if (!outputPath || outputPath.endsWith(".html")) {
      if (html.includes("cagov-post-list")) {
        html = renderPostLists(html);
      }
    }
    return html;
  });

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
    },
  };
};
