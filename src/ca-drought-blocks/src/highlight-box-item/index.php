<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class HighlightBoxItem extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes, 'highlight-box-item');
    $imgUrl = $attributes['imgUrl'] ?? '';
    $imgAlt = $attributes['imgAlt'] ?? '';

    return <<<HTML
      <div class="$classList">
        <img src="$imgUrl" alt="$imgAlt">
        <div>
          $content
        </div>
      </div>
    HTML;
  }
}

new HighlightBoxItem();

?>