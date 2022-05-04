<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class SectionBlock extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $fullBleed = $attributes['fullBleed'];
    $localClasses = $fullBleed ? "full-bleed section-block" : "section-block";
    $classList = $this->createClassList($attributes, $localClasses);

    return <<<HTML
      <section class="$classList">
        $content
      </section>
    HTML;
  }
}

new SectionBlock();

?>