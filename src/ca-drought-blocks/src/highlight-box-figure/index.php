<?php

include_once(__DIR__ . "/../base/format.php");

class HighlightBoxFigure extends Format {
  public function enqueue(): void {
    wp_enqueue_script(
      'highlight-box-figure',
      plugins_url( $this->formatUrlPath . '/index.js' ),
      $this->assetFile['dependencies'],
      $this->assetFile['version'],
      false
    );
  
    wp_enqueue_style(
      'highlight-box-figure-styles',
      plugins_url( $this->formatUrlPath . '/index.css' ),
      [],
      $this->assetFile['version']
    );
  }
}

new HighlightBoxFigure();

?>