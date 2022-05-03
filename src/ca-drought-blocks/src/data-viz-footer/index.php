<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class DataVizFooter extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes, 'data-viz-footer');

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new DataVizFooter();

?>