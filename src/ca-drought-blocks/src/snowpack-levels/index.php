<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class SnowpackLevels extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes);
    $unit = $attributes['unit'] ?? '';
    $srIntro = $attributes['srIntro'] ?? '';
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
        data-current="$currentLevel"
        data-historic-peak="$historicPeakLevel"
      >
        <h5 slot="summary-header">$srIntro</h5>
        <p slot="summary-stat" class="current-level current-level-flex">$lede</p>
        <h5 slot="historic-peak-header">$historicPeakHeading</h5>
        <p slot="historic-peak-stat">$historicPeakLevel $unit</p>
        <h5 slot="current-header">$currentHeading</h5>
        <p slot="current-stat">$currentLevel $unit</p>
      </drought-snowpack-levels>
    HTML;
  }
}

new SnowpackLevels();

?>