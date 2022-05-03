<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class DataViz extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $gridSpan = $attributes['gridSpan'];
    $classList = $this->createClassList($attributes, 'data-viz', $gridSpan);

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new DataViz();

?>