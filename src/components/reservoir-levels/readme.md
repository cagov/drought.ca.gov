# Reservoir levels data visualization

This data visualization depicts current water storage level across reservoirs, and compares that current level to historical average.

<img width="384" alt="Screen Shot 2022-05-13 at 10 25 58" src="https://user-images.githubusercontent.com/1208960/168336433-29e5e054-ee9d-426f-914a-d1e5095a0dfa.png">

The intent of this visualization is to show that we have far less "backup" water during dry months than before.

## Data source

Every day, we download an updated copy of the reservoir data from CDEC. Here's the API endpoint where we fetch the data.

https://cdec.water.ca.gov/resapp/service/res/conditions?date=2022-07-13&stationIds=SWV

Note the date in that URL. We update it to the current date for every pull of the data.

Our local copy in this repo is the `majorReservoirConditions.json` file in this folder. This file is processed by 11ty on each build.

We retreive this data via GitHub Action in `.github/workflows/fetch-drought-data.yml`.

## How it works

The custom element, `<drought-reservoir-levels>`, accepts a series of heading/paragraph pairs. These pairs much be tagged with their corresponding `slot` attributes. This content is then rendered into the data visualization via client-side JavaScript. This approach allows us to acheive excellent progressive enhancement, accessibility, and performance. 

## Code sample

Here's some sample mark-up.

```html 
<drought-reservoir-levels data-locale="en-US" data-unit="millions of acre feet (MAF)" data-current="18.60" data-historical="26.89" data-capacity="38.12">
  <h5 slot="summary-header">Summary of current level</h5>
  <p slot="summary-stat" class="current-level">
    <span class="data-viz-pct">69%</span><br>
    of average levels
  </p>

  <h5 slot="capacity-header">Total capacity</h5>
  <p slot="capacity-stat">18.60 millions of acre feet (MAF)</p>

  <h5 slot="historical-header">Average level historically</h5>
  <p slot="historical-stat">26.89 millions of acre feet (MAF)</p>

  <h5 slot="current-header">Current level</h5>
  <p slot="current-stat">38.12 millions of acre feet (MAF)</p>
</drought-reservoir-levels>
```

Some things to note.

* 11ty will fill in the paragraph "stat" values via the `render.js` script in this folder.
  * This `render.js` file is called from the `.eleventy.js` config file for 11ty.
  * `render.js` will also fill the value for `<span class="data-viz-pct">`.
  * The data comes from the `majorReservoirConditions.json` file, also in this folder.
  * **If migrated to another platform, the processing in `render.js` would need to be replaced by another back-end process.**
* `data-current-taf`, `data-historical-taf`, and `data-capacity-taf` are all required. These integers are used to calculate display of the SVG data visualization.
  * These attributes are currently added via `render.js`.
  * `data-capacity` is the total capacity of major reservoirs, in TAF (thousand acre feet).
  * `data-historical` is the historical average sum of water levels among major reservoirs, in TAF.
  * `data-current` is the sum of current water levels across major reservoirs, in TAF. 
* The `data-locale` and `data-unit` attributes may be omitted for English. These attributes should be used for translating the visualization into other languages, if needed. 
  * [See MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) for more info on possible values for `data-locale`.
* The `slot="summary-header"` element is only for screen readers, or when Javascript is disabled.

