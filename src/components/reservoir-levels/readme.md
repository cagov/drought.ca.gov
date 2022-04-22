# Reservoir levels markup example

Here's an example of the mark-up for the `drought-reservoir-levels` component. The focus here is on foundational progressive enhancement and complete translatability.

```html 
<drought-reservoir-levels data-locale="en-US" data-current-taf="10531" data-historical-taf="16012" data-capacity-taf="22623">
  <h4 slot="heading">Major reservoir levels</h4>
  <p slot="description">Reservoirs get us through the dry months</p>

  <h5 slot="capacity-taf-heading">Total capacity</h5>
  <p slot="capacity-taf-stats">
    <span id="capacity-taf"></span> 
    thousands of acre feet (TAF)
  </p>

  <h5 slot="historical-taf-heading">Average level historically</h5>
  <p slot="historical-taf-stats">
    <span id="historical-taf"></span> 
    thousands of acre feet (TAF)
  </p>

  <h5 slot="current-taf-heading">Current level</h5>
  <p slot="current-taf-stats">
    <span id="current-taf"></span> 
    thousands of acre feet (TAF)
  </p>
  <p slot="current-level">
    <span id="current-percentage" class="data-viz-pct"></span><br />
    of average levels
  </p>

  <p slot="update-frequency" class="data-viz-freq">Updated daily</p>
  <p slot="more-info" class="data-viz-more">
    <a href="#">More about reservoirs</a>
  </p>
</drought-reservoir-levels>
```

## Notes

### Data attributes

There are four data attributes on the custom element. 

`data-locale` is optional. It's used to format the numbers for translated display. And it's only used in 11ty at this time. Defaults to `en-US`. [See MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) for more info on possible values.

`data-current-taf`, `data-historical-taf`, and `data-capacity-taf` are all required. These integers are used to calculate display of the SVG data visualization.

`data-capacity-taf` is the total capacity of major reservoirs, in TAF (thousand acre feet).

`data-historical-taf` is the historical average sum of water levels among major reservoirs, in TAF.

`data-current-taf` is the sum of current water levels across major reservoirs, in TAF. 

### Placeholders

There are four placeholders for displaying data-driven values: 

* `<span id="capacity-taf"></span>`
* `<span id="historical-taf"></span>`
* `<span id="current-taf"></span>`
* `<span id="current-percentage"></span>`

These may be left blank in Wordpress. 11ty will fill these values upon rendering the pages.

Otherwise, these `<span>` elements are not needed if using another platform. It's purely the purview of the component consumer.

### Slots

All of the `slot` elements are required, and should be self-explanatory based on their contents in the sample markup above.

Note that you can slot any type of heading into the heading slots. `h4` and `h5` are not required; use what's right for your document's hierarchy. Just know that you may need to provide minor styling tweaks.

### Utility classes

Since we're using the ShadowDOM, know that all of the markup in the sample above is YOUR content. You may need to style it yourself in some scenarios. A few utility classes have been provided on the Drought site for this use: `data-viz-pct`, `data-viz-freq`, and `data-viz-more`.

