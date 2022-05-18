<?php

include_once(__DIR__ . "/../base/dynamic-block.php");

class SpeiMap extends DynamicBlock {
  public function render( $attributes, $content ): string {
    $classList = $this->createClassList($attributes);
    $imgHref = $attributes['imgHref'] ?? '';
    $altText = $attributes['altText'] ?? '';
    $legendHeading = $attributes['legendHeading'] ?? '';
    $extremeWet = $attributes['extremeWet'] ?? '';
    $severeWet = $attributes['severeWet'] ?? '';
    $moderateWet = $attributes['moderateWet'] ?? '';
    $normal = $attributes['normal'] ?? '';
    $moderateDry = $attributes['moderateDry'] ?? '';
    $severeDry = $attributes['severeDry'] ?? '';
    $extremeDry = $attributes['extremeDry'] ?? '';

    return <<<HTML
      <drought-spei-map 
        class="$classList"
        role="img"
        aria-label="$altText"
      >
        <svg width="200" height="252" viewBox="0 0 200 252" aria-hidden="true">
          <text x="0" y="0" text-anchor="start" dominant-baseline="hanging" class="bold">
            $legendHeading
          </text>

          <text x="50" y="52" dominant-baseline="middle" text-anchor="start">
            $extremeWet
          </text>
          <text x="50" y="82" dominant-baseline="middle" text-anchor="start">
            $severeWet
          </text>
          <text x="50" y="102" dominant-baseline="middle" text-anchor="start">
            $moderateWet
          </text>
          <text x="50" y="142" dominant-baseline="middle" text-anchor="start">
            $normal
          </text>
          <text x="50" y="182" dominant-baseline="middle" text-anchor="start">
            $moderateDry
          </text>
          <text x="50" y="202" dominant-baseline="middle" text-anchor="start">
            $severeDry
          </text>
          <text x="50" y="232" dominant-baseline="middle" text-anchor="start">
            $extremeDry
          </text>

          <g stroke="#898891" stroke-width="1">
            <rect x="1" y="31" width="28" height="20" fill="#260072" />
            <rect x="1" y="51" width="28" height="20" fill="#3C00FE" />
            <line x1="40" y1="33" x2="40" y2="69" />

            <rect x="1" y="71" width="28" height="20" fill="#01B9FF" />
            <line x1="40" y1="73" x2="40" y2="89" />

            <rect x="1" y="91" width="28" height="20" fill="#6EFFD8" />
            <line x1="40" y1="93" x2="40" y2="109" />

            <rect x="1" y="111" width="28" height="20" fill="#00FF19" />
            <rect x="1" y="131" width="28" height="20" fill="#FFFFFF" />
            <rect x="1" y="151" width="28" height="20" fill="#DEFF00" />
            <line x1="40" y1="113" x2="40" y2="169" />

            <rect x="1" y="171" width="28" height="20" fill="#FCD800" />
            <line x1="40" y1="173" x2="40" y2="189" />

            <rect x="1" y="191" width="28" height="20" fill="#FF8601" />
            <line x1="40" y1="193" x2="40" y2="209" />

            <rect x="1" y="211" width="28" height="20" fill="#FE0000" />
            <rect x="1" y="231" width="28" height="20" fill="#B40001" />
            <line x1="40" y1="213" x2="40" y2="249" />
          </g>
        </svg>
        <img loading="lazy" class="spei-map-img" src="$imgHref" alt="$altText" />
      </drought-spei-map>
    HTML;
  }
}

new SpeiMap();

?>