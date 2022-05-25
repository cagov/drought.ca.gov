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

The custom element, `<drought-snowpack-levels>`, accepts two pieces of content: a `<p>` and a `<table>`. The table is then rendered into the data visualization via client-side JavaScript. This approach allows us to acheive excellent progressive enhancement, accessibility, and performance. 

## Code sample

Here's how to add the mark-up to this 11ty-based site.

```html
<drought-snowpack-levels data-unit="inches" data-locale="en-US" data-historic-peak-label="Historic peak">
  <p slot="current-level" class="snowpack-current-level">
    <span id="current-percentage" class="data-viz-pct">31%</span>
    <span>of average peak snowpack</span>
  </p>
  <table slot="table-data" id="snowpack-data-table">
    <caption>
      A caption for this data.
    </caption>
    <thead>
      <tr>
        <th id="snowpack-historic-header">
          Average peak snow water equivalent<br />from 1991–2020
        </th>
        <th id="snowpack-current-header">Current snow water equivalent</th>
      </tr>
    </thead>
  </table>
</drought-snowpack-levels>
```

Some things to note.

* 11ty will fill in the table rows via the `render.js` script in this folder.
  * This `render.js` file is called from the `.eleventy.js` config file for 11ty.
  * `render.js` will also fill the value for `<span id="current-percentage">`.
  * The table row data comes from `snowpackConditions.json` file, also in this folder.
  * **If migrated to another platform, the processing in `render.js` would need to be replaced by another back-end process.**
* `data-historic-peak-label` is optional, and will default to "Historic peak". Use this data attribute to change the label for translated versions.
* The `data-locale` and `data-unit` attributes may be omitted for English too. These attributes should be used for translating the visualization into other languages, if needed. 
  * [See MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) for more info on possible values for `data-locale`.

If 11ty needs to be replaced with another tool, here's an example of the full HTML mark-up that will be expected by the `<drought-snowpack-levels>` custom element.

```html
<drought-snowpack-levels data-unit="inches" data-locale="en-US" data-historic-peak-label="Historic peak">
  <p slot="current-level" class="snowpack-current-level">
    <span id="current-percentage" class="data-viz-pct">31%</span>
    <span>of average peak snowpack</span>
  </p>
  <table slot="table-data" id="snowpack-data-table">
    <caption>
      A caption for this data.
    </caption>
    <thead>
      <tr>
        <th id="snowpack-historic-header">
          Average peak snow water equivalent<br />from 1991–2020
        </th>
        <th id="snowpack-current-header">Current snow water equivalent</th>
      </tr>
    </thead>
    <tbody>
      <tr id="snowpack-data" data-current="8.8" data-historic-peak="25.3">
        <td class="snowpack-historic">25.3 inches</td>
        <td class="snowpack-current">8.8 inches</td>
      </tr>
    </tbody>
  </table>
</drought-snowpack-levels>
```