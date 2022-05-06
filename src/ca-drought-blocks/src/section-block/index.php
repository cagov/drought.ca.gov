<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class SectionBlock extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $fullBleed = $attributes['fullBleed'];
    $color = $attributes['color'];
    $localClasses = $fullBleed ? "full-bleed section-block" : "section-block";
    $classList = $this->createClassList($attributes, $localClasses);

    if ($fullBleed) {
      return <<<HTML
        <section class="$classList" style="background-color: $color;">
          <div class="full-bleed-content-area">
            $content
          </div>
        </section>
      HTML;
    } else {
      return <<<HTML
        <section class="$classList">
          $content
        </section>
      HTML;
    }
  }
}

new SectionBlock();

?>