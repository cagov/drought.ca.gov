<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class DataVizDesc extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes, 'data-viz-desc');

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new DataVizDesc();

?>