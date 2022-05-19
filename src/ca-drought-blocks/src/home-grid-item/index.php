<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class HomeGridItem extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $gridSpan = $attributes['gridSpan'];
    $classList = $this->createClassList($attributes, $gridSpan);

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new HomeGridItem();

?>