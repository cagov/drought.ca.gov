<?php

include_once(__DIR__ . "/../base/dynamic-block.php");
include_once(__DIR__ . "/../data-viz-pct/index.php");

class ReservoirLevels extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes);
    $unit = $attributes['unit'] ?? '';
    $lede = $attributes['lede'] ?? '';
    $caption = $attributes['caption'] ?? '';
    $capacityHeading = $attributes['capacityHeading'] ?? '';
    $historicalHeading = $attributes['historicalHeading'] ?? '';
    $currentHeading = $attributes['currentHeading'] ?? '';
    $capacityTaf = $attributes['capacityTaf'] ?? '';
    $historicalTaf = $attributes['historicalTaf'] ?? '';
    $currentTaf = $attributes['currentTaf'] ?? '';

    return <<<HTML
      <drought-reservoir-levels 
        class="$classList"
        data-unit="$unit" 
        data-capacity-taf="$capacityTaf" 
        data-historical-taf="$historicalTaf"
        data-current-taf="$currentTaf"
      >
        <p slot="current-level" class="current-level">$lede</p>
        <table slot="table-data" id="reservoir-data-table">
          <caption>$caption</caption>
          <thead>
            <tr>
              <th id="capacity-taf-heading">$capacityHeading</th>
              <th id="historical-taf-heading">$historicalHeading</th>
              <th id="current-taf-heading">$currentHeading</th>
            </tr>
          </thead>
          <tbody>
            <tr id="reservoir-data">
              <td className="reservoir-capacity">$capacityTaf $unit</td>
              <td className="reservoir-historic">$historicalTaf $unit</td>
              <td className="reservoir-current">$currentTaf $unit</td>
            </tr> 
          </tbody>
        </table>
      </drought-reservoir-levels>
    HTML;
  }
}

new ReservoirLevels();

?>