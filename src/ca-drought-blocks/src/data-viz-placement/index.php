<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class DataVizPlacement extends DynamicBlock {
  public function render( $attributes, $content ): string {
    // $heading = $attributes['heading'] ?? '';
    // $author = $attributes['author'] ?? '';

    return <<<HTML
      <div class="data-viz-placement">
        $content
      </div>
    HTML;
  }
}

new DataVizPlacement();

?>