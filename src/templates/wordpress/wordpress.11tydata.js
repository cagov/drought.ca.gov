const config = require("../../../odi-publishing/config.js").getConfig();
const siteHost = new URL(config.og_meta.site_url).hostname;

const parseUrl = (fn) => (url) => {
  try {
    let u = new URL(url);
    return fn(u);
  } catch {
    return url;
  }
}

const getUrlPath = parseUrl((url) => url.pathname);

const normalizeUrlHost = parseUrl((url) => {
  if (url.hostname.includes("pantheonsite")) { 
    url.hostname = siteHost; 
  }
  return url.href;
})

module.exports = {
  eleventyComputed: {
    permalink: article => getUrlPath(article.data?.wordpress_url),
    layout: article => article.data?.design_system_fields?.template || article.data?.type || "page",
    // Below, mimic the structure of Wordpress article data files.
    // Use the value in the article data JSON if available, otherwise set default.
    data: {
      og_meta: {
        site_url: config.og_meta.site_url,
        canonical_url: article => 
          normalizeUrlHost(
            article.data?.wordpress_url
          ),
        page_title: article => 
          article.data.og_meta?.page_title 
          || config.og_meta.site_name,
        twitter_title: article => 
          article.data.og_meta?.twitter_title 
          || config.og_meta.site_name,
        open_graph_title: article => 
          article.data.og_meta?.open_graph_title 
          || config.og_meta.site_name,
        site_title: article => 
          article.data.og_meta?.site_name 
          || config.og_meta.site_name,
        site_description: article => 
          article.data?.excerpt 
          || article.data.og_meta?.site_description 
          || config.og_meta.site_description,
        page_description: article => 
          article.data?.excerpt 
          || article.data.og_meta?.page_description 
          || config.og_meta.site_description,
        open_graph_description: article => 
          article.data?.excerpt 
          || article.data.og_meta?.open_graph_description 
          || config.og_meta.site_description,
        twitter_description: article => 
          article.data?.excerpt 
          || article.data.og_meta?.twitter_description 
          || config.og_meta.site_description,
        page_social_image_url: article => 
          normalizeUrlHost(
            article.data.og_meta?.page_social_image_url 
            || config.og_meta.page_social_image_url
          ),
        page_social_image_width: article => 
          article.data.og_meta?.page_social_image_width 
          || config.og_meta.page_social_image_width,
        page_social_image_height: article => 
          article.data.og_meta?.page_social_image_height 
          || config.og_meta.page_social_image_height,
        page_social_image_alt: article => 
          article.data.og_meta?.page_social_image_alt 
          || config.og_meta.page_social_image_alt
      }
    }
  }
};