<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class Grid extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes, 'home-grid');

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new Grid();

?>