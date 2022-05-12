# SPEI map data visualization

This data visualization depicts effects on moisture over time, across a map of California. 

The intent of this visualization is to communicate that one big storm alone can't pull us out of drought. This is an assumption we need to correct among readers during the wet months. The SPEI model considers the full year, not just the current moment.

## Data source

Every day, we download an updated copy of the SPEI map from CA Water Watch. Here's the URL for the image.

https://cww.water.ca.gov/resources/images/map/WGS84.png

The projection of that map is a bit wide, so we do some post-processing on the image in 11ty. That processing can be found in the `transformDroughtMap.js` file. The short summary is that we squish the width of the image to 80% while preserving the same height.

We also download a small JSON file, `updated.json`. This contains simple information about when the map was last updated. The endpoint for that file can be found at the following URL.

https://cww.water.ca.gov/?dataservice=speimap

We retreive this data via GitHub Action in `.github/workflows/fetch-drought-data.yml`.

## Code sample

Here's an example. There's not much magic here; despite using `<drought-spei-map>` as a wrapper, we have not actually defined any custom element in JavaScript.

```html
<drought-spei-map class="data-viz-placement" role="img" aria-label="Alt text for the spei map">
  <svg width="200" height="252" viewBox="0 0 200 252" aria-hidden="true">
    <style>
      text {
        font-size: .9rem;
      }
      text.bold {
        font-weight: 700;
      }
    </style>
    <text x="0" y="0" text-anchor="start" dominant-baseline="hanging" class="bold">
      12 month SPEI
    </text>

    <text x="50" y="52" dominant-baseline="middle" text-anchor="start">
      Extremely wet
    </text>
    <text x="50" y="82" dominant-baseline="middle" text-anchor="start">
      Severely wet
    </text>
    <text x="50" y="102" dominant-baseline="middle" text-anchor="start">
      Moderately wet
    </text>
    <text x="50" y="142" dominant-baseline="middle" text-anchor="start">
        Near normal
    </text>
    <text x="50" y="182" dominant-baseline="middle" text-anchor="start">
      Moderate drought
    </text>
    <text x="50" y="202" dominant-baseline="middle" text-anchor="start">
      Severe drought
    </text>
    <text x="50" y="232" dominant-baseline="middle" text-anchor="start">
      Extreme drought
    </text>

    <g stroke="#898891" stroke-width="1">
      <rect x="1" y="31" width="28" height="20" fill="#260072" />
      <rect x="1" y="51" width="28" height="20" fill="#3C00FE" />
      <line x1="40" y1="33" x2="40" y2="69" />

      <rect x="1" y="71" width="28" height="20" fill="#01B9FF" />
      <line x1="40" y1="73" x2="40" y2="89" />

      <rect x="1" y="91" width="28" height="20" fill="#6EFFD8" />
      <line x1="40" y1="93" x2="40" y2="109" />

      <rect x="1" y="111" width="28" height="20" fill="#00FF19" />
      <rect x="1" y="131" width="28" height="20" fill="#FFFFFF" />
      <rect x="1" y="151" width="28" height="20" fill="#DEFF00" />
      <line x1="40" y1="113" x2="40" y2="169" />

      <rect x="1" y="171" width="28" height="20" fill="#FCD800" />
      <line x1="40" y1="173" x2="40" y2="189" />

      <rect x="1" y="191" width="28" height="20" fill="#FF8601" />
      <line x1="40" y1="193" x2="40" y2="209" />

      <rect x="1" y="211" width="28" height="20" fill="#FE0000" />
      <rect x="1" y="231" width="28" height="20" fill="#B40001" />
      <line x1="40" y1="213" x2="40" y2="249" />
    </g>
  </svg>
  <img loading="lazy" class="spei-map-img" src="/assets/img/WGS84.sized.png" alt="This map of California illustrates severe drought conditions across the state.">
</drought-spei-map>
```