<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class SnowpackLevels extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes);
    $unit = $attributes['unit'] ?? '';
    $lede = $attributes['lede'] ?? '';
    $caption = $attributes['caption'] ?? '';
    $historicPeakHeading = $attributes['historicPeakHeading'] ?? '';
    $currentHeading = $attributes['currentHeading'] ?? '';
    $historicPeakLevel = $attributes['historicPeakLevel'] ?? '';
    $currentLevel = $attributes['currentLevel'] ?? '';

    return <<<HTML
      <drought-snowpack-levels 
        class="$classList"
        data-unit="$unit"
      >
        <p slot="current-level" class="current-level current-level-flex">$lede</p>
        <table slot="table-data" id="snowpack-data-table">
          <caption>$caption</caption>
          <thead>
            <tr>
              <th id="snowpack-historic-header">$historicPeakHeading</th>
              <th id="snowpack-current-header">$currentHeading</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              id="snowpack-data"
              data-current="$currentLevel"
              data-historic-peak="$historicPeakLevel"
            >
              <td class="snowpack-historic">$historicPeakLevel $unit</td>
              <td class="snowpack-current">$currentLevel $unit</td>
            </tr> 
          </tbody>
        </table>
      </drought-snowpack-levels>
    HTML;
  }
}

new SnowpackLevels();

?>