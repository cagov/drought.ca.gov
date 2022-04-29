<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class DataVizDesc extends DynamicBlock {
  public function render( $attributes, $content ): string {
    // $heading = $attributes['heading'] ?? '';
    // $author = $attributes['author'] ?? '';

    return <<<HTML
      <div class="data-viz-desc">
        $content
      </div>
    HTML;
  }
}

new DataVizDesc();

?>