<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class HighlightBox extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes, 'highlight-box');

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new HighlightBox();

?>