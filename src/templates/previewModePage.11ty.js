//@ts-check
const { addPreviewModeDataElements, getPostJsonFromWordpress } = require("@cagov/11ty-serverless-preview-mode");

const wordPressSettings = {
    wordPressSite: "https://live-drought-ca-gov.pantheonsite.io", //Wordpress endpoint
    //previewWordPressTagSlug: 'preview-mode' // optional filter for digest list of preview in Wordpress
}

class previewModePageClass {
    /**
     * First, mostly static.  Returns the frontmatter data.
     */
    async data() {
        return {
            layout: "layouts/index.njk", //Or whatever layout the preview page should have
            tags: ["news"], //Or whatever tags the preview page should have
            ...addPreviewModeDataElements()
        };
    }

    /**
     * Last, after the frontmatter data is loaded.  Able to render the page.
     * @param {*} itemData
     */
    async render(itemData) {
        const jsonData = await getPostJsonFromWordpress(itemData, wordPressSettings);

        let featuredMedia = jsonData._embedded["wp:featuredmedia"];

        let wpTerms = jsonData._embedded["wp:term"];

        const category = (wpTerms.find(x => x.find(y => y.taxonomy === 'category')) || [{name:""}])[0].name;

        //Customize for you templates
        itemData.title = jsonData.title.rendered;
        itemData.templatestring = jsonData.template;
        itemData.category = category;
        itemData.publishdate = jsonData.date.split('T')[0]; //new Date(jsonData.modified_gmt)
        itemData.meta = jsonData.excerpt.rendered;
        itemData.description = jsonData.excerpt.rendered;
        itemData.lead = jsonData.excerpt.rendered;
        itemData.author = jsonData._embedded.author[0].name;
        itemData.previewimage = featuredMedia ? featuredMedia[0].source_url : "img/thumb/APIs-Blog-Postman-Screenshot-1.jpg";

        return jsonData.content.rendered;
    }
}

module.exports = previewModePageClass;