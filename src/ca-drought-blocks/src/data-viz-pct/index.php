<?php

include_once(__DIR__ . "/../base/format.php");

class DataVizPct extends Format {
  public function enqueue(): void {
    wp_enqueue_script(
      'data-viz-pct',
      plugins_url( $this->formatUrlPath . '/index.js' ),
      $this->assetFile['dependencies'],
      $this->assetFile['version'],
      false
    );
  
    wp_enqueue_style(
      'data-viz-pct-styles',
      plugins_url( $this->formatUrlPath . '/index.css' ),
      [],
      $this->assetFile['version']
    );
  }
}

new DataVizPct();

?>