const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const cagovBuildSystem = require('@cagov/11ty-build-system');
const config = require('./odi-publishing/config.js');

const { renderPostLists } = require("./src/components/post-list/render");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(cagovBuildSystem, {
    sass: {
      watch: [
        'src/css/**/*',
        'src/components/**/*.scss'
      ],
      output: 'dist/index.css',
      options: {
        file: 'src/css/sass/index.scss',
        includePaths: ['./src/css/sass']
      }
    },
    rollup: {
      watch: [
        'src/js/**/*',
        'src/components/**/*.js'
      ],
      file: 'src/js/rollup.config.js'
    }
  });

  eleventyConfig.setBrowserSyncConfig({
    watch: true,
    notify: true,
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Change the domain on a URL.
  // Good candidate for 11ty-build-system.
  eleventyConfig.addFilter("changeDomain", function (url, domain) {
    try {
      let u = new URL(url, `https://${domain}`);
      u.host = domain;
      return u.href;
    } catch {
      return url;
    }
  });

  // Replace Wordpress Media paths.
  // Use this explicitly when a full URL is needed, such as within meta tags.
  // Doing so will ensure the domain doesn't get nuked by the HTML transformation below.
  eleventyConfig.addFilter("changeWpMediaPath", function (path) {
    return path.replace(new RegExp(`/${config.build.upload_folder}`, 'g'), "/media/");
  });

  eleventyConfig.addTransform("htmlTransforms", function (html, outputPath) {
    //outputPath === false means serverless templates
    if (!outputPath || outputPath.endsWith(".html")) {
      // Render post-lists
      if (html.includes("cagov-post-list")) {
        html = renderPostLists(html);
      }
      // Replace Wordpress media paths with correct 11ty output path.
      const regexPattern = `http.+?pantheonsite\.io/${config.build.upload_folder}`;
      html = html.replace(new RegExp(regexPattern, 'g'), "/media/");
      // Minify HTML.
      html = htmlmin.minify(html, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return html;
  });

  eleventyConfig.addPassthroughCopy({ "src/wordpress-media": "media" });
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
      layouts: "_includes/layouts"
    },
  };
};
