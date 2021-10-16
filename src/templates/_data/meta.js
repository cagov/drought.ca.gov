/**
 * WordPress content formatter.
 * Read data from WordPress API
 * Compatible with:
 *   * [ca-design-system-gutenberg-blocks](https://github.com/cagov/ca-design-system-gutenberg-blocks) plugin `1.1.0`
 */
const odiPublishing = require("./../../../odi-publishing/config.js");
const config = odiPublishing.getConfig();

const getHeadMetaTags = function (item) {
  // Content pulled in from JSON
  // const jsonData = item.data.data; // Different data mapping drought vs. cannabis @ISSUE
  const jsonData = item.data.wordpress.dataset.data;

  // WordPress API data
  item.data.meta = getMetaTagValue(jsonData, "excerpt");
  item.data.excerpt = getMetaTagValue(jsonData, "excerpt"); // Unstripped excerpt. WordPress manages excerpts and this allows HTML tags.
  item.data.description = getMetaTagValue(jsonData, "excerpt"); // OG Meta does not allow HTML tags, but the description default should be the excerpt from WordPress
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

  // const jsonData = item.data.data; // Different data mapping drought vs. cannabis @ISSUE
  const jsonData = item.data.wordpress.dataset.data;

  let default_og_meta = {
    site_name: getMetaTagValue(jsonData, "site_name") || config.og_meta.site_name, // Allow overrides from editor data, but fall back to headless config file
    site_description: getMetaTagValue(jsonData, "site_description") || config.og_meta.site_description,  // Allow overrides from editor data, but fall back to headless config file
    site_url: config.og_meta.site_url,  // No not allow url overrides from editor
    
    page_title: jsonData.title || config.og_meta.title,
    meta_title: jsonData.title || config.og_meta.title,
    open_graph_title: jsonData.title || config.og_meta.title,
    twitter_title: jsonData.title || config.og_meta.title,
    
    canonical_url: jsonData.wordpress_url || config.og_meta.canonical_url, // @FEATURE change to data from meta structure, but need to hash out and agree on our schema structure as a team & publicly
    meta_canonical_url: jsonData.wordpress_url || config.og_meta.canonical_url,

    // @TODO keyword support: jsonData.categories (from array)
    page_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description,
    meta_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description,
    open_graph_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description,
    twitter_description:
      getMetaTagValue(jsonData, "excerpt") || config.og_meta.description,

    page_social_image_url: config.og_meta.page_social_image_url,
    page_social_image_width: config.og_meta.page_social_image_width,
    page_social_image_height: config.og_meta.page_social_image_height,
    page_social_image_alt: config.og_meta.page_social_image_alt, // @TODO get media alt data @ISSUE
    // @TODO - check this
    //  if (jsonData.media) {
    //   const featuredMedia = jsonData.media.find((x) => x.featured);
    //   if (featuredMedia) {
    //     item.data.previewimage = upload_folder + featuredMedia.path;
    //   }
  };

  // Set default data from config
  item.data.og_meta = default_og_meta;

  // Replace default hash with local data
  if (jsonData.og_meta !== undefined && jsonData.og_meta.editor !== undefined) {
    // @NOTE: If a page SEO editor is used, use values from WordPress API data (otherwise default to core wordpress or pre-formatted response if the conditionally available data is not set.)
    Object.keys(jsonData.og_meta).map((meta) => {
      if (jsonData.og_meta[meta] !== "") {
        item.data.og_meta[meta] = jsonData.og_meta[meta];
        if (typeof item.data.og_meta[meta] === "string") {
          item.data.og_meta[meta] = item.data.og_meta[meta].replace(/(<([^>]+)>)/gi, ""); // No HTML tags allowed for meta content.
        }
      }
    });
  }

  // Replace static site URLs in og meta content so that the URL path is correct.
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
  // console.log(item.data.og_meta);
  return item.data.og_meta;
};

const getOGMedia = function () {
 // @PLACEHOLDER might use
        // Belongs in meta but also not using it yet, might though @TODO check this
        // if (jsonData.media) {
        //   const featuredMedia = jsonData.media.find((x) => x.featured);
        //   if (featuredMedia) {
        //     item.data.previewimage =
        //       "/wp-content/uploads/" + featuredMedia.path;
        //   }
        // }
}

/**
 * Read the og_meta data object from content API. Process field data for a given field.
 * @param {*} data
 * @param {*} field
 * @returns
 */
const getMetaTagValue = function (data, field) {
  // Default mapping is from WordPress.
  if (field === "excerpt") {
    try {
      const content = data.excerpt.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags.
      return content;
    } catch (error) {
    //   console.error("no excerpt found", error);
    }
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

exports.getHeadMetaTags = getHeadMetaTags;
exports.getOGMetaData = getOGMetaData;
exports.getMetaTagValue = getMetaTagValue;
exports.replaceUrl = replaceUrl;
