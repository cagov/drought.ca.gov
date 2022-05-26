# Snowpack levels data visualization

This data visualization depicts the growth and shrinkage of snowpack level across the year, compared to historical average.

<img width="377" alt="Screen Shot 2022-05-13 at 10 26 09" src="https://user-images.githubusercontent.com/1208960/168336578-b7a5bcd3-7e59-42af-a9ed-4288a3edb336.png">

The intent of this visualization is straight-forward: emphasize lack of snowpack and corresponding effects on reservoirs and rivers.

## Data source

Every day, we download an updated copy of the snowpack data from CDEC. Here's the API endpoint where we fetch the data.

https://cdec.water.ca.gov/snowapp/services/statewide/swe

Our local copy in this repo is the `snowpackConditions.json` file in this folder. This file is processed by 11ty on each build.

We retreive this data via GitHub Action in `.github/workflows/fetch-drought-data.yml`.

## How it works

The custom element, `<drought-snowpack-levels>`, accepts a series of heading/paragraph pairs. These pairs much be tagged with their corresponding `slot` attributes. This content is then rendered into the data visualization via client-side JavaScript. This approach allows us to acheive excellent progressive enhancement, accessibility, and performance. 

## Code sample

Here's how to add the mark-up to this 11ty-based site.

```html
<drought-snowpack-levels data-unit="inches" data-locale="en-US" data-historic-peak-label="Historic peak" data-current="1.2" data-historic-peak="25.3">
  <h5 slot="summary-header">Summary of current level</h5>
  <p slot="summary-stat" class="current-level current-level-flex">
    <span class="data-viz-pct">4%</span> 
    <span>of average peak snowpack</span>
  </p>

  <h5 slot="historic-peak-header">Average peak snow water equivalent<br>from 1991–2020</h5>
  <p slot="historic-peak-stat">25.3 inches</p>
  
  <h5 slot="current-header">Current snow water equivalent</h5>
  <p slot="current-stat">1.2 inches</p>
</drought-snowpack-levels>
```

Some things to note.

* 11ty will fill in the paragraph "stat" values via the `render.js` script in this folder.
  * This `render.js` file is called from the `.eleventy.js` config file for 11ty.
  * `render.js` will also fill the value for `<span class="data-viz-pct">`.
  * The data comes from `snowpackConditions.json` file, also in this folder.
  * **If migrated to another platform, the processing in `render.js` would need to be replaced by another back-end process.**
* `data-current` and `data-historic-peak` are required. These numbers are used to calculate display of the SVG data visualization.
  * These attributes are currently added via `render.js`.
  * `data-current` is the current snowpack level in inches.
  * `data-historic-peak` is the historical average of peak snowpack, typically measured on April 1st, in inches.
* `data-historic-peak-label` is optional, and will default to "Historic peak". Use this data attribute to change the label for translated versions.
* The `data-locale` and `data-unit` attributes may be omitted for English too. These attributes should be used for translating the visualization into other languages, if needed. 
  * [See MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) for more info on possible values for `data-locale`.
* The `slot="summary-header"` element is only for screen readers, or when Javascript is disabled.
