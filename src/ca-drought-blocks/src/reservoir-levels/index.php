<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class ReservoirLevels extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes);
    $srIntro = $attributes['srIntro'] ?? '';
    $unit = $attributes['unit'] ?? '';
    $lede = $attributes['lede'] ?? '';
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
        <h5 slot="summary-header">$srIntro</h5>
        <p slot="summary-stat" class="current-level">$lede</p>
        <h5 slot="capacity-header">$capacityHeading</h5>
        <p slot="capacity-stat">$capacityTaf $unit</p>
        <h5 slot="historical-header">$historicalHeading</h5>
        <p slot="historical-stat">$historicalTaf $unit</p>
        <h5 slot="current-header">$currentHeading</h5>
        <p slot="current-stat">$currentTaf $unit</p>
      </drought-reservoir-levels>
    HTML;
  }
}

new ReservoirLevels();

?>