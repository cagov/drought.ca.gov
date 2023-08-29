<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class HeadingWithMore extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes, 'heading-with-more');

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new HeadingWithMore();

?>