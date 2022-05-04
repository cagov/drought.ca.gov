<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class SectionBlockFullBleed extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes, 'full-bleed-content-area');

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new SectionBlockFullBleed();

?>