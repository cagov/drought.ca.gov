// const fs = require("fs");
const CleanCSS = require("clean-css"); // Optimize CSS
const htmlmin = require("html-minifier");
// @TODO Sync with cannabis work
const getRecentPosts = require("./src/templates/_data/recent-posts.js"); // Q: What does this do?
const postList = require("./src/templates/_data/post-list.js"); // Get templated post-list
const eventList = require("./src/templates/_data/event-list.js"); // Get templated post-list

const {
  processContentPage,
  processContentPost,
  processContentEvent,
} = require("./src/templates/_data/content.js"); // Content type processors

// @TODO DEPRECATING
// const wordpressEditor = "https://live-drought-ca-gov.pantheonsite.io";
// const wordpressEditorApi = "https://live-drought-ca-gov.pantheonsite.io";
// const wordpressEditorMediaFiles = "https://live-drought-ca-gov.pantheonsite.io";
// // const SITE_DOMAIN = process.env.SITE_DOMAIN !== undefined ? process.env.SITE_DOMAIN : "";
// const SITE_DOMAIN = ""; // Relative links only for local images in display.
// // const DEFAULT_SITE_DOMAIN_OG_TAGS = "http://staging.drought.ca.gov.s3-website-us-west-1.amazonaws.com/media/";
// // const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://d24fehwpk146d4.cloudfront.net/media/";
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://drought.ca.gov/media/";
// // const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://live-drought-ca-gov.pantheonsite.io/wp-content/uploads/"; // Test with original image (not cached)

// const replacementPaths = {
//   media: {
//     src: "https://live-drought-ca-gov.pantheonsite.io/wp-content/uploads/",
//     target: "/media/",
//     targetPermalink: `${SITE_DOMAIN}/media/`,
//     targetPermalinkOGTags: `${DEFAULT_SITE_DOMAIN_OG_TAGS}`,
//     targetPermalinkTest:
//       "https://github.com/cagov/drought.ca.gov/raw/main/wordpress/media/",
//   },
// };

// @DOCS 11ty reference
/**
 * Create 11ty build configuration settings
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });

  // @Q: Why are we doing this re-write?
  // @DOCS Let's explain our logic a little for everyone using the code.
  eleventyConfig.addPassthroughCopy({
    "wordpress/media": "wp-content/uploads",
  });
  eleventyConfig.addPassthroughCopy({ "dist/index.css.map": "/index.css.map" }); // @Q Does this order matter?

  eleventyConfig.addPassthroughCopy({ "wordpress/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "dist/*": "/" });

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
    let folderNames = ["/wordpress/pages"];

    collection.getAll().forEach((item) => {
      item = processContentPage(item, folderNames);

      if (item.data.data) {
        if (item.data.data.type === "page") {
          posts.push(item);
        }
      }
    });

    // posts.sort((a,b) => {
    //   return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
    // });
    return posts;
  });

  // Process content, update data.
  eleventyConfig.addCollection("posts", function (collection) {
    let posts = [];
    // @TODO @DOCS odi-publishing.json settings
    let folderNames = ["/wordpress/posts"];

    collection.getAll().forEach((item) => {
      item = processContentPost(item, folderNames);

      if (item.data.data) {
        if (item.data.data.type === "post") {
          posts.push(item);
        }
      }
      // @TODO correct the sort field - YYYY-MM-DD custom_post_date (requires DB sync)
      // pressPosts.sort((a,b) => {
      //   return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
      // });
    });

    //   console.log("posts", posts);
    return posts;
  });

  // TEMP DISABLE
  eleventyConfig.addFilter("postlist", function (html) {
    let myRe = /<cagov-post-list-new\s*.*>\s*.*<\/cagov-post-list-new>/gs;
    let myArray = myRe.exec(html);
    let lastPosts = getRecentPosts();
    let postListHTML = postList(lastPosts);
    if (myArray) {
      return html.replace(myArray[0], postListHTML);
    }
    return html;
  });

  // TEMP DISABLE
  eleventyConfig.addFilter("eventlist", function (html) {
    let myRe = /<cagov-event-post-list-new\s*.*>\s*.*<\/cagov-event-post-list-new>/gs;
    let myArray = myRe.exec(html);
    let recentPosts = getRecentEvents({
      count: 5,
      fieldDate: "custom_post_date",
    });
    let eventtListHTML = eventList(recentPosts);
    if (myArray) {
      return html.replace(myArray[0], eventListHTML);
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
      input: "src/templates",
      output: "docs",
    },
  };
};
