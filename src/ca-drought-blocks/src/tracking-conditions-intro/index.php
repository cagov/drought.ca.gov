<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class TrackingConditionsIntro extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $gridSpan = $attributes['gridSpan'];
    $classList = $this->createClassList($attributes, 'tracking-conditions-intro', $gridSpan);

    return <<<HTML
      <div class="$classList">
        $content
      </div>
    HTML;
  }
}

new TrackingConditionsIntro();

?>