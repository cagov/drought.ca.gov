<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class DecorativeImage extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes);
    $imgUrl = $attributes['imgUrl'] ?? '';
    $imgAlt = $attributes['imgAlt'] ?? '';

    return <<<HTML
      <img src="$imgUrl" alt="$imgAlt" class="$classList">
    HTML;
  }
}

new DecorativeImage();

?>