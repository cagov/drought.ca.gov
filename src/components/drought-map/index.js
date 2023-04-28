// Drought Map
// Discontinued. Replaced by the SPEI map component.

import latestDroughtMap from '../../templates/_data/latestDroughtMap.json';

class CAGovDroughtMap extends window.HTMLElement {
    connectedCallback() {
      console.log("Loading Drought Map");
      this.type = "wordpress";
  
      if (this.type === "wordpress") {
        document.addEventListener("DOMContentLoaded", () => {
          this.template({ }, "wordpress");
        }
        );
      }
    }
  

    template(data, type) {
      if (data !== undefined && data !== null && data.content !== null) {
        if (type === "wordpress") {
          this.innerHTML = `<div class="cagov-drought-map">
                <p class="map-label">Released ${latestDroughtMap.dateString}. Updates automatically each Thursday.</p>

                <p>Click the map to see the intensity of drought conditions in California:</p>
                <div class="drought-map-container">
                  <div class="drought-map-image"><a href="https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx?CA"><img src="${latestDroughtMap.filePath}" /></a></div>
                  <div class="legend-label"><h4>Intensity</h4></div>
                  <div class="drought-map-legend">
                      <div class="col-1">
                          <div class="legend"><span class="intensity intensity-ldnone"> </span>None</div>
                          <div class="legend"><span class="intensity intensity-ld0"> </span>D0 (Abnormally dry)</div>
                          <div class="legend"><span class="intensity intensity-ld1"> </span>D1 (Moderate drought)</div>
                      </div>
                      <div class="col-2">
                          <div class="legend"><span class="intensity intensity-ld2"> </span>D2 (Severe drought)</div>
                          <div class="legend"><span class="intensity intensity-ld3"> </span>D3 (Extreme drought)</div>
                          <div class="legend"><span class="intensity intensity-ld4"> </span>D4 (Exceptional drought)</div>
                      </div>
                      <div class="col-3">
                          <div class="legend"><span class="intensity intensity-ldnodata"> </span>No data</div>
                      </div>
                  </div>
                  <div class="map-link"><a href="https://droughtmonitor.unl.edu/">View details on US Drought Monitor</a></div>
                </div>
            </div>`;
        }
      }
  
      return null;
    }
  }
  
  if (customElements.get("cagov-drought-map") === undefined) {
    window.customElements.define("cagov-drought-map", CAGovDroughtMap);
  }
