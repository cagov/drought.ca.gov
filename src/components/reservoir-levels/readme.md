# Reservoir levels data visualization

This data visualization depicts current water storage level across major reservoirs, and compares that current level to historical average.

The intent of this visualization is to show that we have far less "backup" water during dry months than before.

These calculations are limited to the major reservoirs that were recommended by CDEC for this purpose. Specifically, we're looking at the following CDEC Station IDs.

* SHA
* ORO
* BUL
* FOL
* CMN
* CLE
* WRS
* SNL
* CCH
* CSI
* CAS
* DMV
* NML
* DNP
* EXC
* MIL
* PNF

## Code sample

Here's how to add the mark-up to this 11ty-based site.

```html 
<drought-reservoir-levels data-locale="en-US" data-unit="thousands of acre feet (TAF)" data-current-taf="11347" data-historical-taf="17613" data-capacity-taf="23623">
  <p slot="current-level">
    <span id="current-percentage" class="data-viz-pct"></span><br />of
    average levels
  </p>
  <table slot="table-data" id="reservoir-data-table">
    <caption>
      A caption for this data.
    </caption>
    <thead>
      <tr>
        <th id="capacity-taf-heading">Total capacity</th>
        <th id="historical-taf-heading">Average level historically</th>
        <th id="current-taf-heading">Current level</th>
      </tr>
    </thead>
  </table>
</drought-reservoir-levels>
```

Some things to note.

* 11ty will fill in the table rows via the `render.js` script in this folder.
  * This `render.js` file is called from the `.eleventy.js` config file for 11ty.
* `render.js` will also fill the value for `<span id="current-percentage">`.
* The table row data comes from the files in the `majorReservoirConditions.json` file, also in this folder.
  * This data file is fetched via GitHub Action in `.github/workflows/fetch-drought-data.yml`.
* `data-current-taf`, `data-historical-taf`, and `data-capacity-taf` are all required. These integers are used to calculate display of the SVG data visualization.
  * `data-capacity-taf` is the total capacity of major reservoirs, in TAF (thousand acre feet).
  * `data-historical-taf` is the historical average sum of water levels among major reservoirs, in TAF.
  * `data-current-taf` is the sum of current water levels across major reservoirs, in TAF. 
* The `data-locale` and `data-unit` attributes may be omitted for English; these are defaults. These attributes should be used for translating the visualization into other languages, if needed. 
  * [See MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) for more info on possible values for `data-locale`.

If 11ty needs to be replaced with another tool, here's an example of the full HTML mark-up that will be expected by the `<drought-reservoir-levels>` custom element.

```html 
<drought-reservoir-levels data-locale="en-US" data-unit="thousands of acre feet (TAF)" data-current-taf="11347" data-historical-taf="17613" data-capacity-taf="23623">
  <p slot="current-level">
    <span id="current-percentage" class="data-viz-pct">64%</span><br />of
    average levels
  </p>
  <table slot="table-data" id="reservoir-data-table">
    <caption>
      A caption for this data.
    </caption>
    <thead>
      <tr>
        <th id="capacity-taf-heading">Total capacity</th>
        <th id="historical-taf-heading">Average level historically</th>
        <th id="current-taf-heading">Current level</th>
      </tr>
    </thead>
    <tbody>
      <tr id="reservoir-data">
        <td class="reservoir-capacity">23,623 thousands of acre feet (TAF)</td>
        <td class="reservoir-historic">17,613 thousands of acre feet (TAF)</td>
        <td class="reservoir-current">11,347 thousands of acre feet (TAF)</td>
      </tr>
    </tbody>
  </table>
</drought-reservoir-levels>
```

