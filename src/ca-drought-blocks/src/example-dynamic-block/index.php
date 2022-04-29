<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class ExampleDynamicBlock extends DynamicBlock {
  public function render( $attributes, $content ): string {
    // $title = $attributes['title'] ?? '';
    // $author = $attributes['author'] ?? '';

    return <<<HTML
      <p class="wp-block-ca-drought-blocks-example-dynamic-block">
        Dynamic rendering!
      </p>
    HTML;
  }
}

new ExampleDynamicBlock();

?>