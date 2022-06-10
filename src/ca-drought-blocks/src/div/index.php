<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class Div extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes);

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new Div();

?>