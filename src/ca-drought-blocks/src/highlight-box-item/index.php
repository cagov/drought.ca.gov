<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class HighlightBoxItem extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes, 'highlight-box-item');

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new HighlightBoxItem();

?>