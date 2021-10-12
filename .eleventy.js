const CleanCSS = require("clean-css"); // Optimize CSS
const htmlmin = require("html-minifier"); // Minify HTML
const cheerio = require("cheerio");

const lastFewPosts = require("./src/components/post-list/last-few-posts");
const {
  postListServerRender,
  setDefaultAttributes,
} = require("./src/components/post-list/render");

const {
  processContentPage,
  processContentPost,
  // processContentEvent,
} = require("./pages/_data/content.js"); // Content type processors
// @DOCS 11ty reference
/**
 * Create 11ty build configuration settings
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "wp-content/uploads"}); // Copy media folder to wp-uploads
  eleventyConfig.addPassthroughCopy({ "dist/index.css.map": "/index.css.map" }); // @Q Does this order matter?

  eleventyConfig.setBrowserSyncConfig({
    watch: true,
    notify: true,
  });

  // Make CSS smaller
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  /* Content type collections */
  // Process content, update data.
  eleventyConfig.addCollection("pages", function (collection) {
    let posts = [];
    // @TODO @DOCS odi-publishing.json settings
    let folderNames = ["/pages/wordpress/pages"];
    collection.getAll().forEach((item) => {
      item = processContentPage(item, folderNames);
      if (item.data.data) {
        if (item.data.data.type === "page") {
          posts.push(item);
        }
      }
    });
    return posts;
  });

  // Process content, update data.
  eleventyConfig.addCollection("posts", function (collection) {
    let posts = [];
    // @TODO @DOCS odi-publishing.json settings
    let folderNames = ["/pages/wordpress/posts"]; // @DOCS @CONFIG
    collection.getAll().forEach((item) => {
      item = processContentPost(item, folderNames);
      if (item.data.data) {
        if (item.data.data.type === "post") {
          posts.push(item);
        }
      }
    });
    return posts;
  });

  const renderPostList = function (html) {
    var postLists = html.matchAll(
      /<cagov-post-list\s*[^>]*?\s*>[\s\S]*?<\/cagov-post-list>/gm
    );

    let result = html;

    for (postList of postLists) {
      let { 0: originalMarkup, index } = postList;
      let $ = cheerio.load(originalMarkup, null, false);
      let postListElement = $("cagov-post-list").get(0);
      let postListAttributes = Object.keys(postListElement.attribs).reduce(
        (obj, attr) => {
          let camelCasedKey = attr
            .replace("data-", "")
            .replace(/-([a-z])/g, (g) => g[1].toUpperCase());

          obj[camelCasedKey] = postListElement.attribs[attr];
          return obj;
        },
        {}
      );

      let processedAttributes = setDefaultAttributes(postListAttributes);
      let recentPosts = lastFewPosts(postListAttributes.category);

      let modifiedMarkup = postListServerRender(
        recentPosts,
        processedAttributes
      );

      $("cagov-post-list").append(modifiedMarkup);
      result = result.replace(originalMarkup, $.html());
    }

    return result;
  };

  eleventyConfig.addTransform("renderPostLists", function (html, outputPath) {
    //outputPath === false means serverless templates
    if (!outputPath || outputPath.endsWith(".html")) {
      if (html.includes("cagov-post-list")) {
        html = renderPostList(html);
      }
    }
    return html;
  });

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

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "pages",
      output: "docs",
    },
  };
};
