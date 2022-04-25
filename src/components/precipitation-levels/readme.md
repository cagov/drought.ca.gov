# Precipitation levels data visualization

This data visualization depicts the last seven months of precipitation (think rain and snow) against historical averages for each month. 

The main intent is not to show lack of precipitation. Rather, the intent is to show wild fluctuations in current precipitation, both above and below historical average per-month.

For example, in December 2021, we saw precipitation far above the historical average for December. However, this was followed by several months of almost no precipitation, far below average.

## Not currently in use

This data visualization was removed for several reasons.

* The schedule for updated data does not happen on a schedule expected by the layperson. For example, data for April might not be complete until several weeks into May. We decided this might defy the expectations of readers for this site.
* We are currently going into the summer months, when looking at this graph might not be very exciting.
* The SPEI map is viewed as a more holistic view of precipitation, with respect to communicating overall drought conditions.

But the code is still here, and we can pull this back into the site whenever needed. If needed, you'll need to add reference to the `index.js` file here back into `src/js/index.js`, to include it within 11ty's JS build.

## Code sample

Here's how to add the mark-up to this 11ty-based site.

```html
<drought-precipitation-levels data-locale="en-US" data-unit="inches">
  <table slot="table-data" id="precip-data-table">
    <caption>
      A caption for this data.
    </caption>
    <thead>
      <tr>
        <th id="precip-month-header">Month</th>
        <th id="precip-total-header">Statewide precipitation</th>
        <th id="precip-historic-header">Historic average</th>
      </tr>
    </thead>
  </table>
</drought-precipitation-levels>
```

Some things to note.

* 11ty will fill in the table rows via the `render.js` script in this folder.
  * This `render.js` file is called from the `.eleventy.js` config file for 11ty.
* The table row data comes from the files in the `data` folder, also in this folder.
  * Files in the `data` folder are fetched via GitHub Action in `.github/workflows/fetch-drought-data.yml`.
* The `data-locale` and `data-unit` attributes may be omitted for English; these are defaults. These attributes should be used for translating the visualization into other languages, if needed.
  * [See MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) for more info on possible values for `data-locale`.

If 11ty needs to be replaced with another tool, here's an example of the full HTML mark-up that will be expected by the `<drought-participation-levels>` custom element.

```html
<drought-precipitation-levels data-locale="en-US" data-unit="inches">
  <table slot="table-data" id="precip-data-table">
    <caption>
      A caption for this data.
    </caption>
    <thead>
      <tr>
        <th id="precip-month-header">Month</th>
        <th id="precip-total-header">Statewide precipitation</th>
        <th id="precip-historic-header">Historic average</th>
      </tr>
    </thead>
    <tbody>
      <tr id="precip-month-9" data-month="9" data-year="2021" data-total="57.03" data-historic="51.00">
        <td class="precip-month-label">Sep</td>
        <td class="precip-month-total">57.03 inches</td>
        <td class="precip-month-historic">51.00 inches</td>
      </tr>
      <tr id="precip-month-10" data-month="10" data-year="2021" data-total="928.35" data-historic="256.73">
        <td class="precip-month-label">Oct</td>
        <td class="precip-month-total">928.35 inches</td>
        <td class="precip-month-historic">256.73 inches</td>
      </tr>
      <tr id="precip-month-11" data-month="11" data-year="2021" data-total="207.19" data-historic="483.75">
        <td class="precip-month-label">Nov</td>
        <td class="precip-month-total">207.19 inches</td>
        <td class="precip-month-historic">483.75 inches</td>
      </tr>
      <tr id="precip-month-12" data-month="12" data-year="2021" data-total="1472.27" data-historic="875.38">
        <td class="precip-month-label">Dec 2021</td>
        <td class="precip-month-total">1472.27 inches</td>
        <td class="precip-month-historic">875.38 inches</td>
      </tr>
      <tr id="precip-month-1" data-month="1" data-year="2022" data-total="80.17" data-historic="923.56">
        <td class="precip-month-label">Jan 2022</td>
        <td class="precip-month-total">80.17 inches</td>
        <td class="precip-month-historic">923.56 inches</td>
      </tr>
      <tr id="precip-month-2" data-month="2" data-year="2022" data-total="51.62" data-historic="863.86">
        <td class="precip-month-label">Feb</td>
        <td class="precip-month-total">51.62 inches</td>
        <td class="precip-month-historic">863.86 inches</td>
      </tr>
      <tr id="precip-month-3" data-month="3" data-year="2022" data-total="168.17" data-historic="725.95">
        <td class="precip-month-label">Mar</td>
        <td class="precip-month-total">168.17 inches</td>
        <td class="precip-month-historic">725.95 inches</td>
      </tr>
    </tbody>
  </table>
</drought-precipitation-levels>
```
