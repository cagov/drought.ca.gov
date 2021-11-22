const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const cagovBuildSystem = require('@cagov/11ty-build-system');

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

  eleventyConfig.addTransform("htmlTransforms", function (html, outputPath) {
    //outputPath === false means serverless templates
    if (!outputPath || outputPath.endsWith(".html")) {
      if (html.includes("cagov-post-list")) {
        // Render post-lists
        html = renderPostLists(html);

        // Replace Wordpress media paths with correct 11ty output path.
        html = html.replace(new RegExp("http.+?/wp-content/uploads/", 'g'), "/media/");

        // Minify HTML.
        html = htmlmin.minify(html, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });
      }
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
