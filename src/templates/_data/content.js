/**
 * WordPress content formatter.
 * Read data from WordPress API
 * Compatible with:
 *   * [ca-design-system-gutenberg-blocks](https://github.com/cagov/ca-design-system-gutenberg-blocks) plugin `1.1.0`
 */
const odiPublishing = require("./../../../odi-publishing/config.js");
const config = odiPublishing.getConfig();

/**
 *
 * @param {*} item
 * @param {*} folderNames
 */
exports.processContentPost = (item, folderNames) => {
  if (
    item.inputPath.includes(folderNames[0]) ||
    item.inputPath.includes(folderNames[1])
  ) {
    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";

    item = processContentItem(item);
  }
  return item;
};

/**
 *
 * @param {*} item
 * @param {*} folderNames
 */
exports.processContentPage = (item, folderNames) => {
  if (
    item.inputPath.includes(folderNames[0]) ||
    item.inputPath.includes(folderNames[1])
  ) {
    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";
    item = processContentItem(item);
  }
  return item;
};

/**
 *
 * @param {*} item
 * @param {*} folderNames
 */
exports.processContentEvent = (item, folderNames) => {
  if (
    item.inputPath.includes(folderNames[0]) ||
    item.inputPath.includes(folderNames[1])
  ) {
    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";
    item = processContentItem(item);
  }
  return item;
};

/**
 *
 * @param {*} item
 * @returns
 */
 const processContentItem = (contentItem) => {
  let item = contentItem;

  console.log(item);
  // Data attributes required by the 11ty build.
  item.url = item.outputPath; // Target document folder
  item.data.page.url = item.url; // Original URL of page, from WordPress

  //content pulled in from JSON
  const jsonData = item.data.data;
  // item.data.layout = "layouts/index";
  item.data.layout = config.build.index_layout; // Full page index layout
  // Data attributes required by the 11ty build.
  item.url = item.outputPath; // Target document folder
  item.data.page.url = item.url; // Original URL of page, from WordPress
  //  item.data.layout = config.build.index_layout; // Full page index layout
  item.data.title = item.data.data.title;
  item.data.publish_date = item.data.data.date.split("T")[0]; //new Date(jsonData.modified_gmt) // @Q how do we use this?
  // @TODO include date posted & other custom fields?
  item.data.template = chooseTemplate(item.data.data, "WordPress"); // Get page layout template name
  item.data.id = item.data.data.id; // Q: how are we using this? @DOCS
  item.data.parent_id = item.data.data.parent; // Used in breadcrumb
  let replaceUrls = [ // @TEMP location @TODO 
    "http://drought.ca.gov/",
    "https://drought.ca.gov/",
    "https://dev-cagov-dcc.pantheonsite.io/",
    "https://test-cagov-dcc.pantheonsite.io/",
    "https://live-cagov-dcc.pantheonsite.io/",
  ];
  // @TEMP!
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
  item.template.frontMatter.content = replaceUrl(
    item.template.frontMatter.content,
    replaceUrls[3],
    "/"
  );
  item.template.frontMatter.content = replaceUrl(
    item.template.frontMatter.content,
    replaceUrls[4],
    "/"
  );
  // Page meta, including og
  item = getHeadMetaTags(item);

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

  return item;
};

const getHeadMetaTags = function (item) {
  // Content pulled in from JSON
  const jsonData = item.data.data;
  // Q: Dups? @TODO
  item.data.meta = getMetaTagValue(jsonData, "excerpt");
  item.data.excerpt = getMetaTagValue(jsonData, "excerpt"); // @TODO - same question
  item.data.description = getMetaTagValue(jsonData, "excerpt"); // @TODO - same question
  // item.data.description = item.data.og_meta.page_description; // @TODO Remove dup?

  item.data.category = jsonData.category; // Content category label
  // item.data.lead = jsonData.excerpt; // @TODO Remove? Doesn't look like code uses this.
  item.data.author = jsonData.author; // Page content author
  item.data.og_meta = getOGMetaData(item); // Open graph tags for page sharing.

  // @TODO fix media path?
  return item;
};

/**
 *
 * @param {*} item
 * @returns
 */
const getOGMetaData = function (item) {
  if (!item.data.og_meta) {
    item.data.og_meta = {};
  }

  console.log("item", item);
  let jsonData = item.data.data;

  let default_og_meta = {
    site_name: config.og_meta.site_name,
    site_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description, // @ISSUE This should have been excerpt raw (from wordpress-to-github), not rendered. Wrong field.
    site_url: config.og_meta.site_url,
    canonical_url: jsonData.wordpress_url || config.og_meta.canonical_url, // @ISSUE check variable name
    meta_canonical_url: jsonData.wordpress_url || config.og_meta.canonical_url,

    page_title: jsonData.title || config.og_meta.title,
    meta_title: jsonData.title || config.og_meta.title,
    open_graph_title: jsonData.title || config.og_meta.title,
    twitter_title: jsonData.title || config.og_meta.title,

    page_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description,
    meta_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description,
    open_graph_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description,
    twitter_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description,

    page_social_image_url: config.og_meta.page_social_image_url,
    // @TODO - check this
    //  if (jsonData.media) {
    //   const featuredMedia = jsonData.media.find((x) => x.featured);
    //   if (featuredMedia) {
    //     item.data.previewimage = upload_folder + featuredMedia.path;
    //   }
    page_social_image_width: config.og_meta.page_social_image_width,
    page_social_image_height: config.og_meta.page_social_image_height,
    page_social_image_alt: config.og_meta.page_social_image_alt,
  };
  // Set default data
  item.data.og_meta = default_og_meta;

  if (jsonData.og_meta !== undefined && jsonData.og_meta.editor !== undefined) {
    // If a page SEO editor is used, use values from WordPress API data (otherwise default to core wordpress or pre-formatted response if the conditionally available data is not set.)
    console.log("api", jsonData.og_meta);
    Object.keys(jsonData.og_meta).map((meta) => {
      if (jsonData.og_meta[meta] !== "") {
        item.data.og_meta[meta] = jsonData.og_meta[meta];
      }
    });
  }

  // Replace static site URLs in og meta content
  Object.keys(item.data.og_meta).map((field) => {
    if (item.data.og_meta[field] !== "") {
      let replacedField = replaceUrl(
        item.data.og_meta[field],
        config.build.editor_url,
        config.build.static_site_url
      );
      if (replacedField !== undefined) {
        item.data.og_meta[field] = replacedField;
      }
    }
  });
  console.log(item.data.og_meta);
  return item.data.og_meta;
};

/**
 * Utility function to replace all instances of a string.
 * @param {*} string
 * @param {*} match
 * @param {*} replacement
 * @returns
 */
const replaceUrl = function (content, match, replacement) {
  try {
    if (typeof content === "string") {
      return content.replace(new RegExp(match, "g"), replacement);
    }
  } catch (error) {
    console.error(error);
  }
  return content;
};

/**
 * For processing slugs.
 * @param {*} url
 * @returns
 */
const cleanUrl = function (url) {
  try {
    if (url) {
      // @DOCS odi-publishing.json
      if (url.indexOf(".pantheonsite.io/") > -1) {
        return url.split(".pantheonsite.io/")[1];
      }
      if (url.indexOf("drought.ca.gov") > -1) {
        return url.split("drought.ca.gov")[1];
      }
    }
  } catch (error) {
    console.error(error);
  }

  return url;
};

/**
 * Get the njk template that corresponds to settings from the API
 * @param {*} data
 * @returns
 */
const chooseTemplate = function (data, cms = "WordPress") {
  // Get value set in API for headless design system
  let template;
  if (data.design_system_fields) {
    template = data.design_system_fields.template;
  }
  if (data.wordpress_url === "https://drought.ca.gov/") {
    return "landing";
  }
  if (data.wordpress_url === "https://drought.ca.gov/search/") {
    return "search";
  }
  if (data.template?.indexOf("single-column") > -1) {
    return "single-column";
  }

  // Handle errors
  if (template === undefined || template === null) {
    if (data.type === "post") {
      return "post";
    } else if (data.type === "page") {
      return "page";
    }
    return "page";
  }
  // Return template set by editor
  return template;
};

/**
 * Read the og_meta data object from content API. Process field data for a given field.
 * @param {*} data
 * @param {*} field
 * @returns
 */
const getMetaTagValue = function (data, field) {
  // Default mapping is from WordPress.
  if (field === "excerpt") {
    const content = data.excerpt.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags.
    return content;
  }

  if (field === "page_title") {
    try {
      // SEO framework. Check API setting as different editors could be used.
      if (data.og_meta._genesis_title !== "") {
        return data.og_meta._genesis_title;
      } else if (data.og_meta._open_graph_title !== "") {
        return data.og_meta._genesis_title;
      } else {
        return data.title;
      }
    } catch (error) {
      console.error("No site, page or post title found.");
    }
    return config.og_meta.site_name;
  }
  if (field === "twitter_title") {
    try {
      if (data.og_meta._twitter_title !== "") {
        return data.og_meta._twitter_title;
      } else {
        return data.title;
      }
    } catch (error) {
      console.error("No twitter title found.");
    }
    return config.og_meta.site_name;
  }
  if (field === "site_title") {
    try {
      return data.site_settings.site_name;
    } catch (error) {
      console.error("No site, page or post title found.");
    }
    return config.og_meta.site_name;
  }
  if (field === "page_description") {
    try {
      if (data.og_meta._genesis_description !== "") {
        return data.og_meta._genesis_description[0];
      } else if (data.og_meta._open_graph_description !== "") {
        return data.og_meta._open_graph_description[0];
      } else {
        return data.site_settings.site_description;
      }
    } catch (error) {
      console.error("No site, page or post description found.");
    }
  }
  if (field === "site_description") {
    try {
      return data.site_settings.site_description;
    } catch (error) {
      console.error("No site, page or post description found.");
    }
    return "";
  }
  if (field === "image") {
    try {
      return {
        url: data.og_meta._social_image_url,
        width: config.og_meta.page_social_image_width || 1200, // @TODO Need to expose variable from API in plugin @ISSUE (have to reverse lookup media id based on how media object is saved in WP)
        height: config.og_meta.page_social_image_height || 630, // @TODO Need to expose variable from API in plugin @ISSUE (have to reverse lookup media id based on how media object is saved in WP)
      };
    } catch (error) {
      console.error("No social image found.");
    }
    return {
      url:
        config.og_meta.page_social_image_url || "https://placekitten/1200/630",
      width: config.og_meta.page_social_image_width || 1200, // @TODO Need to expose variable from API in plugin @ISSUE (have to reverse lookup media id based on how media object is saved in WP)
      height: config.og_meta.page_social_image_height || 630, // @TODO Need to expose variable from API in plugin @ISSUE (have to reverse lookup media id based on how media object is saved in WP)
    };
  }
  return false;
};


function getCategory(data) {
  if (data.categories && data.categories[0]) {
    return data.categories[0];
  }
  return false;
}