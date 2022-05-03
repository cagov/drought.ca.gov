<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class DataViz extends DynamicBlock {
  public function render( $attributes, $content ): string {
    // $heading = $attributes['heading'] ?? '';
    // $author = $attributes['author'] ?? '';

    $classList = $this->createClassList($attributes, 'data-viz');

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new DataViz();

?>